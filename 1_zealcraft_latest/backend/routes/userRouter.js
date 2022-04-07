import bcrypt from 'bcryptjs';
import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import User from '../models/userModel.js';
import { generateToken, resetPasswordToken } from '../utils.js';
import { isAuth, isAdmin } from '../utils.js';
import multer from 'multer';
import path from 'path';
import ProductCategory from '../models/productCategoryModel.js';

const userRouter = express.Router();

//For Sign in
userRouter.post(
  '/signin',
  expressAsyncHandler(async (req, res) => {
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      if (bcrypt.compareSync(req.body.password, user.password)) {
        res.send({
          _id: user._id,
          image: user.image,
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
    res.status(401).send({ message: 'Invalid email or password' });
  })
);

//For Sign up
userRouter.post(
  '/register',
  expressAsyncHandler(async (req, res) => {
    const newUser = new User({
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password),
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
      res.send({ message: 'User is not registered!' });
      return;
    }
    //if user exist, create a one time link that is valid for 15min
    res.send({
      _id: user._id,
      email: user.email,
      reset_token: `${resetPasswordToken(user)}+${user.password}`,
    });
    res.status(401).send({ message: 'Invalid email or password' });
  })
);

//reset password router
userRouter.put(
  '/reset-password',
  expressAsyncHandler(async (req, res) => {
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      user.email = req.body.email;
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
  })
);

//Admin portal > UserListScreen.js > View users list
userRouter.get(
  '/admin/users',
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const users = await User.find({});
    const updatedUsers = users.filter((user) => user.isUser === true);
    res.send(updatedUsers);
  })
);

//Admin portal > CustomerListScreen.js > View customers list
userRouter.get(
  '/admin/customers',
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const customers = await User.find({});
    const updatedcustomers = customers.filter(
      (user) => user.isCustomer === true
    );
    res.send(updatedcustomers);
  })
);

//Admin portal > CategoriesScreen.js > View categories list
userRouter.get(
  '/admin/categories',
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const categories = await ProductCategory.find({});
    res.send(categories);
  })
);

//Admin portal > UserEditScreen.js/CustomerEditScreen.js > View user/customer
userRouter.get(
  '/admin/:id',
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);
    if (user) {
      res.send(user);
    } else {
      res.status(404).send({ message: 'User Not Found' });
    }
  })
);

//UserEditScreen.js/CustomerEditScreen.js/ProfileScreen.js > For image upload
const __dirname = path.resolve();
console.log(__dirname);
const DIR = path.join(__dirname, '../frontend/build/images/');
console.log(DIR);
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, DIR);
  },
  filename: (req, file, cb) => {
    const imageName =
      new Date().toISOString().replace(/:/g, '-') + '-' + file.originalname;
    cb(null, imageName);
  },
});

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype == 'image/png' ||
    file.mimetype == 'image/jpg' ||
    file.mimetype == 'image/jpeg'
  ) {
    cb(null, true);
  } else {
    cb(null, false);
    return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
  }
};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
});

// userRouter.put(
//   '/:id',
//   isAuth,
//   upload.single('image'),
//   expressAsyncHandler(async (req, res) => {
//     const user = await User.findById(req.params.id);
//     if (user) {
//       user.firstName = req.body.firstName || user.firstName;
//       user.lastName = req.body.lastName || user.lastName;
//       user.image = req.file.filename || user.image;
//       user.email = req.body.email || user.email;
//       if (req.body.password) {
//         user.password = bcrypt.hashSync(req.body.password);
//       }
//       user.address = req.body.address || user.address;
//       user.city = req.body.city || user.city;
//       user.postalCode = req.body.postalCode || user.postalCode;
//       user.country = req.body.country || user.country;
//       user.phone = req.body.phone || user.phone;
//       user.role = req.body.role || user.role;
//       const updatedUser = await user.save();
//       res.send({
//         message: 'User Updated',
//         user: updatedUser,
//         token: generateToken(updatedUser),
//       });
//     } else {
//       res.status(404).send({ message: 'User not updated' });
//     }
//   })
// );

//Admin portal > UserEditScreen.js/CustomerEditScreen.js > For editing user/customer
userRouter.put(
  '/admin/:id',
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);
    if (user) {
      user.firstName = req.body.firstName || user.firstName;
      user.lastName = req.body.lastName || user.lastName;
      // user.image = req.file.filename || user.image;
      user.image = req.body.image || user.image;
      user.email = req.body.email || user.email;
      if (req.body.password) {
        user.password = bcrypt.hashSync(req.body.password, 8);
      }
      user.address = req.body.address || user.address;
      user.city = req.body.city || user.city;
      user.postalCode = req.body.postalCode || user.postalCode;
      user.country = req.body.country || user.country;
      user.phone = req.body.phone || user.phone;
      user.isAdmin = req.body.isAdmin || user.isAdmin;
      user.isCustomer = req.body.isCustomer || user.isCustomer;
      user.isUser = req.body.isUser || user.isUser;
      const updatedUser = await user.save();
      console.log(updatedUser);
      res.send(updatedUser);
    } else {
      res.status(404).send({ message: 'User Not Found' });
    }
  })
);

//ProfileScreen.js > View profile
userRouter.get(
  '/profile',
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);
    if (user) {
      res.send(user);
    } else {
      res.status(404).send({ message: 'User Not Found' });
    }
  })
);

//ProfileScreen.js > For editing profile
userRouter.put(
  '/profile',
  isAuth,
  // upload.single('image'),
  expressAsyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);
    if (user) {
      user._id = req.user._id;
      user.firstName = req.body.firstName || user.firstName;
      user.lastName = req.body.lastName || user.lastName;
      // user.image = req.file.filename || user.image;
      user.image = req.body.image || user.image;
      user.email = req.body.email || user.email;
      if (req.body.password) {
        user.password = bcrypt.hashSync(req.body.password, 8);
      }
      user.address = req.body.address || user.address;
      user.city = req.body.city || user.city;
      user.postalCode = req.body.postalCode || user.postalCode;
      user.country = req.body.country || user.country;
      user.phone = req.body.phone || user.phone;
      user.isAdmin = req.body.isAdmin || user.isAdmin;
      user.isCustomer = req.body.isCustomer || user.isCustomer;
      user.isUser = req.body.isUser || user.isUser;
      const updatedUser = await user.save();
      res.send({
        updatedUser,
        // _id: updatedUser._id,
        // firstName: updatedUser.firstName,
        // lastName: updatedUser.lastName,
        // image: updatedUser.image,
        // email: updatedUser.email,

        // password: bcrypt.hashSync(updatedUser.password, 8),

        // address: updatedUser.address,
        // city: updatedUser.city,
        // postalCode: updatedUser.postalCode,
        // country: updatedUser.country,
        // phone: updatedUser.phone,
        // token: generateToken(updatedUser),
      });
    } else {
      res.status(404).send({ message: 'User not found' });
    }
  })
);

//Admin portal > UserEditScreen.js/CustomerEditScreen.js > Delete user/customer
userRouter.delete(
  '/admin/:id',
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);
    if (user) {
      await user.remove();
      res.send({ message: 'Deletion successfull.' });
    } else {
      res.status(404).send({ message: 'Deletion error.' });
    }
  })
);

export default userRouter;
