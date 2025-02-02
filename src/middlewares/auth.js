import jwt from 'jsonwebtoken';
import { ADMIN_JWT_SECRET, USER_JWT_SECRET } from '../utils/env.js';
import userModel from '../models/user.model.js';
import adminModel from '../models/admin.model.js';
export const userAuth = async(req, res, next) => {
    try {
        const token = req.headers['x-auth-token'];
        const access = token.replace('Bearer ','');
        const decoded = jwt.verify(access, USER_JWT_SECRET);
        const user = await userModel.findById(decoded._id);
        if (!user) {
            return res.send({ message: 'unauthorized' });
        }
        req.user = user;
        next();
    } catch (error) {
        res.send({
            message: 'unauthorized',
            msg: error.message
        })
    }
};
export const adminAuth = async(req, res, next) => {
    try {
        const token = req.headers['x-auth-token'];
        const access = token.replace('Bearer ','');
        const decoded = jwt.verify(access, ADMIN_JWT_SECRET);
        const admin = await adminModel.findById(decoded._id);
        if (!admin) {
            return res.send({ message: 'unauthorized' });
        }
        req.admin = admin;
        next();
    } catch (error) {
        res.send({
            message: 'unauthorized',
            msg: error.message
        })
    }
};