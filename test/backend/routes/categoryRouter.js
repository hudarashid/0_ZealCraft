// import bcrypt from 'bcryptjs';
import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import ProductCategory from '../models/productCategoryModel.js';
// import { generateToken } from '../utils.js';
// import { isAuth } from '../utils.js';

const categoryRouter = express.Router();

categoryRouter.get(
  '/',
  expressAsyncHandler(async (req, res) => {
    const categories = await ProductCategory.find({});
    res.send(categories);
  })
);

export default categoryRouter;
