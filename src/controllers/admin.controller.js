import md5 from "md5";
import adminModel from "../models/admin.model.js";
import jwt from "jsonwebtoken";
import { ADMIN_JWT_SECRET } from "../utils/env.js";
export default {
    signIn: async (req, res) => {
        try {
            const { username, password } = req.body;
            if (!username || !password) throw new Error('Fill the rows');

            const admin = await adminModel.findOne({ username: username.toLowerCase().trim(), password: md5(password) });

            if (!admin) throw new Error('Username or password is incorrect');

            const access = jwt.sign({ _id: admin._id }, ADMIN_JWT_SECRET, { expiresIn: '1d' });
            admin.access = access;
            await admin.save();
            res.send({
                ok: true,
                msg: 'Successfully signed in',
                data: {
                    username: admin.username,
                    name: admin.name,
                    role: admin.role
                },
                access
            });
        } catch (error) {
            res.send({
                ok: false,
                msg: error.message
            });
        }
    },
    verify: (req, res) => {
        const { admin } = req;
        res.send({
            ok: true,
            data: {
                username: admin.username,
                name: admin.name,
                role: admin.role
            }
        })
    },
}