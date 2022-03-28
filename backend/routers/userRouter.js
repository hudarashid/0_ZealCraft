import bcrypt from "bcryptjs";
import express from "express";
import expressAsyncHandler from "express-async-handler";
import User from "../models/userModel.js";
import { generateToken, resetPasswordToken } from "../utils.js";

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

//forgot password router
userRouter.post(
    '/forgot-password',
    expressAsyncHandler(async (req, res, next) => {
        const user = await User.findOne({ email: req.body.email });
        //make sure user exist in database
        if (!user) {
            res.send({ message: "User is not registered!" });
            return;
        }
        //if user exist, create a one time link that is valid for 15min
        res.send({
            _id: user._id,
            email: user.email,
            reset_token: `${resetPasswordToken(user)}+${user.password}`
        });
        res.status(401).send({ message: "Invalid email or password" });
    })
);

//reset password router
userRouter.put(
    '/reset-password',
    expressAsyncHandler(async (req, res) => {

        const user = await User.findOne({ email: req.body.email });
        if (user) {
            user.email = req.body.email
            user.password = bcrypt.hashSync(req.body.password);

            const updateUserPassword = await user.save();
            res.send({
                email: updateUserPassword.email,
                token: generateToken(updateUserPassword),
            });
        } else {
            res.status(404).send({ message: 'User not found' });
            return;
        }
    }
    ));

export default userRouter;