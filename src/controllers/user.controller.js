import md5 from "md5";
import userModel from "../models/user.model.js";
import { sendActivator } from "../utils/email.js";
import emailValidaor from 'email-validator';
import jwt from 'jsonwebtoken';
import { USER_JWT_SECRET } from "../utils/env.js";
export default {
    signUp: async (req, res) => {
        const { email, firstName, password, role } = req.body;
        try {
            if (!email || !firstName || !password || !role) throw new Error("fill_the_rows");

            const validate = emailValidaor.validate(email);
            if (!validate) throw new Error("invalid_email");

            const user = await userModel.findOne({
                email: email.toLowerCase().trim(),
                firstName,
                role,
                password: md5(password),
            });
            await user.save();
            await sendActivator(email, user._id);
            return res.send({ ok: true, msg: "activator_sended" });
        } catch (error) {
            if (error.code === 11000) {
                return res.send({ ok: false, msg: "alaredy_registered" });
            }
            return res.send({ ok: false, msg: error.message });
        }
    },
    signIn: async (req, res) => {
        const { email, password } = req.body;
        try {
            if (!email || !password) throw new Error("fill_the_rows");
            // 
            const user = await userModel.findOne({ email: email.toLowerCase().trim(), password: md5(password) });
            if (!user) throw new Error("user_not_found");
            // 
            if (!user.active) throw new Error("user_not_activated");
            // 
            const access = jwt.sign({ _id: user._id }, USER_JWT_SECRET);
            user.access = access;
            await user.save();
            return res.send({
                ok: true,
                msg: "success",
                access,
                data: {
                    _id: user._id,
                    email: user.email,
                    image: user.image,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    role: user.role
                }
            });
        } catch (err) {
            return res.send({ ok: false, msg: err.message });
        }
    },
    verify: async (req, res) => {
        try {
            res.send({
                ok: true,
                data: req.user
            });
        } catch (error) {
            return res.send({ ok: false, msg: error.message });
        }
    },
    activate: async (req, res) => {
        try {
            const { _id } = req.body;
            const user = await userModel.findByIdAndUpdate(_id, { active: true }, { new: true });
            // 
            if (!user) throw new Error("user_not_found");
            // 
            const access = jwt.sign({ _id: user._id }, USER_JWT_SECRET);
            user.access = access;
            await user.save();
            return res.send({
                ok: true,
                msg: "success",
                access,
                data: {
                    _id: user._id,
                    email: user.email,
                    image: user.image,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    role: user.role
                }
            });
        } catch (error) {
            res.send({
                ok: false,
                msg: error.message
            })
        }
    },
    resendActivator: async (req, res) => {
        try {
            const { email } = req.body;
            const user = await userModel.findOne({ email: email.toLowerCase().trim() });
            if (!user) throw new Error("user_not_found");
            await sendActivator(email, user._id);
            return res.send({ ok: true, msg: "activator_sended" });
        } catch (error) {
            return res.send({ ok: false, msg: error.message });
        }
    },
}