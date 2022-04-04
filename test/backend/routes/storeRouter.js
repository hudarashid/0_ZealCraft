import bcrypt from 'bcryptjs';
import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import User from '../models/userModel.js';
import { generateToken } from '../utils.js';
import { isAuth, isAdmin } from '../utils.js';
import multer from 'multer';
import path from 'path';
import Store from '../models/storeModel.js';

const storeRouter = express.Router();

storeRouter.get(
  '/mystores',
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const stores = await Store.find({ userId: req.user._id });
    res.send(stores);
  })
);

storeRouter.post(
  '/create',
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const newStore = new Store({
      storeName: req.body.storeName,
      storeDetail: req.body.storeDetail,
      bannerImage: req.body.bannerImage,
      additionalPhoto: req.body.additionalPhoto,
      supportEmail: req.body.supportEmail,
      storeRating: req.body.storeRating,
      storeStatus: req.body.storeStatus,
      supportPhone: req.body.supportPhone,
      userId: req.user._id,
    });

    const store = await newStore.save();
    res.status(201).send({ message: 'New Store Created', store });
  })
);

storeRouter.get(
  '/:id',
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const store = await Store.findById(req.params.id);
    if (store) {
      res.send(store);
    } else {
      res.status(404).send({ message: 'Store Not Found' });
    }
  })
);

// storeRouter.put(
//   '/:id',
//   isAuth,
//   expressAsyncHandler(async (req, res) => {
//     const store = await Store.findById(req.params.id);
//     if (user) {
//       store._id = req.body._id;
//       user.firstName = req.body.firstName || user.firstName;
//       user.lastName = req.body.lastName || user.lastName;
//       // user.image = req.file.filename || user.image;
//       user.image = req.body.image || user.image;
//       user.email = req.body.email || user.email;
//       if (req.body.password) {
//         user.password = bcrypt.hashSync(req.body.password, 8);
//       }
//       user.address = req.body.address || user.address;
//       user.city = req.body.city || user.city;
//       user.postalCode = req.body.postalCode || user.postalCode;
//       user.country = req.body.country || user.country;
//       user.phone = req.body.phone || user.phone;
//       user.isAdmin = req.body.isAdmin || user.isAdmin;
//       user.isCustomer = req.body.isCustomer || user.isCustomer;
//       user.isUser = req.body.isUser || user.isUser;
//       const updatedUser = await user.save();
//       res.send({
//         _id: updatedUser._id,
//         firstName: updatedUser.firstName,
//         lastName: updatedUser.lastName,
//         image: updatedUser.image,
//         email: updatedUser.email,

//         password: bcrypt.hashSync(updatedUser.password, 8),

//         address: updatedUser.address,
//         city: updatedUser.city,
//         postalCode: updatedUser.postalCode,
//         country: updatedUser.country,
//         phone: updatedUser.phone,
//       });
//     } else {
//       res.status(404).send({ message: 'User not found' });
//     }
//   })
// );

storeRouter.put(
  '/:id',
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const storeId = req.params.id;
    const store = await Store.findById(storeId);

    if (store) {
      store.storeName = req.body.storeName || store.storeName;
      store.storeDetail = req.body.storeDetail || store.storeDetail;
      store.bannerImage = req.body.bannerImage || store.bannerImage;
      store.additionalPhoto = req.body.additionalPhoto || store.additionalPhoto;
      store.supportEmail = req.body.supportEmail || store.supportEmail;
      store.storeRating = req.body.storeRating || store.storeRating;
      store.storeStatus = req.body.storeStatus || store.storeStatus;
      store.supportPhone = req.body.supportPhone || store.supportPhone;
      store.userId = req.body.userId || store.userId;
      const updatedStore = await store.save();
      // console.log(updatedStore);
      res.send(updatedStore);
    } else {
      res.status(404).send({ message: 'Store Not Updated' });
    }
  })
);

export default storeRouter;
