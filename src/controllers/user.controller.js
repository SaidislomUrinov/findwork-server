import userModel from "../models/user.model.js";
import { sendActivator } from "../utils/email.js";
import emailValidaor from 'email-validator';
import jwt from 'jsonwebtoken';
import { USER_JWT_SECRET } from "../utils/env.js";
import categoryModel from "../models/category.model.js";
import vacancyModel from "../models/vacancy.model.js";
import { getNow } from "../utils/date.js";
import activatorModel from "../models/activator.model.js";
import applicationModel from "../models/application.model.js";
export default {
    auth: async (req, res) => {
        try {
            const email = req.body.email?.toLowerCase().trim();
            if (!email) throw new Error("fill_the_rows");

            if (!emailValidaor.validate(email)) throw new Error("invalid_email");

            let user = await userModel.findOne({ email });

            if (!user) {
                user = new userModel({ email });
                await user.save();
            }

            const activator = new activatorModel({ user: user._id });
            await activator.save();
            await sendActivator(email, activator._id);

            return res.send({ ok: true, msg: "activator_sended" });
        } catch (error) {
            return res.send({ ok: false, msg: error.message });
        }
    },
    verifyActivator: async (req, res) => {
        try {
            const { _id } = req.query;
            const activator = await activatorModel.findOne({ _id }).populate('user');

            if (!activator) throw new Error("link_not_found");

            if (activator.created + 300 < getNow()) throw new Error("link_expired");

            if (!activator.isActive) throw new Error("link_alaredy_used");

            activator.isActive = true;
            await activator.save();
            const user = activator.user;
            const access = jwt.sign({ _id: user._id }, USER_JWT_SECRET, { expiresIn: '1d' });
            user.access = access;
            await user.save();
            return res.send({
                ok: true,
                msg: "success",
                data: {
                    _id: user._id,
                    email: user.email,
                    image: user.image,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    role: user.role
                },
                access
            })
        } catch (error) {
            return res.send({
                ok: false,
                msg: error.message
            })
        }
    },
    verify: async (req, res) => {
        try {
            return res.send({
                ok: true,
                data: req.user
            });
        } catch (error) {
            return res.send({ ok: false, msg: error.message });
        }
    },
    // 
    getStats: async (_, res) => {
        try {
            const companies = await userModel.countDocuments({ role: 'employer', isCompany: true });
            const categories = await categoryModel.countDocuments();
            const vacancies = await vacancyModel.countDocuments({ status: 'active' });
            return res.send({
                ok: true,
                data: {
                    companies,
                    categories,
                    vacancies
                }
            })
        } catch (error) {
            return res.send({ ok: false, msg: error.message });
        }
    },
    updateRole: async (req, res) => {
        try {
            const { role } = req.body;
            if (!role) throw new Error('fill_the_rows');
            const user = req.user;
            user.role = role;
            await user.save();
            return res.send({
                ok: true,
                msg: "success"
            });
        } catch (error) {
            return res.send({ ok: false, msg: error.message });
        }
    },
    getMyStats: async (req, res) => {
        const { role, _id } = req.user;
        try {
            if (role === 'employer') {
                const vacancies = await vacancyModel.find({ 
                    user: _id, 
                    status: { $in: ['active', 'pending'] }, 
                    ended: { $gte: getNow() } 
                });
    
                const applications = (await Promise.all(vacancies.map(v => v.applications()))).reduce((total, count) => total + count, 0);
    
                return res.send({ ok: true, data: { vacancies: vacancies.length, applications } });
            }
    
            const applications = await applicationModel.countDocuments({ user: _id, status: 'pending' });
            res.send({ ok: true, data: { applications } });
            
        } catch (error) {
            res.send({ ok: false, msg: error.message });
        }
    }
    
}