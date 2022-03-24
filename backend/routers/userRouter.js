import bcrypt from "bcryptjs";
import express from "express";
import expressAsyncHandler from "express-async-handler";
import User from "../models/userModel.js";
import { generateToken } from "../utils.js";

const userRouter = express.Router();

userRouter.post(
    '/signin',
    expressAsyncHandler(async (req, res) => {
        const user = await User.findOne({ email: req.body.email })
        if (user) {
            if (bcrypt.compareSync(req.body.password, user.password)) {
                res.send({
                    _id: user._id,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    email: user.email,
                    address: user.address,
                    city: user.city,
                    postalCode: user.postalCode,
                    country: user.country,
                    phone: user.phone,
                    isAdmin: user.isAdmin,
                    isUser: user.isUser,
                    isCustomer: user.isCustomer,
                    token: generateToken(user),
                });
                return;
            }
        }
        res.status(401).send({ message: "Invalid email or password" });
    })
);

userRouter.post(
    '/register',
    expressAsyncHandler(async (req, res) => {
        const newUser = new User({
            //firstName: req.body.firstName,
            //lastName: req.body.lastName,
            email: req.body.email,
            password: bcrypt.hashSync(req.body.password),
            //address: req.body.address,
            //city: req.body.city,
            //postalCode: req.body.postalCode,
            //country: req.body.country,
            //phone: req.body.phone,
            isCustomer: req.body.isCustomer,
            isUser: req.body.isUser,
        });
        const user = await newUser.save();
        res.send({
            _id: user._id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            address: user.address,
            city: user.city,
            postalCode: user.postalCode,
            country: user.country,
            phone: user.phone,
            isAdmin: user.isAdmin,
            isCustomer: user.isCustomer,
            isUser: user.isUser,
            token: generateToken(user),
        });
    })
);

export default userRouter;