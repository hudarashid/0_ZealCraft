// import bcrypt from 'bcryptjs';
import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import ProductCategory from '../models/productCategoryModel.js';
// import { generateToken } from '../utils.js';
import { isAuth, isAdmin } from '../utils.js';

const categoryRouter = express.Router();

categoryRouter.get(
  '/',
  expressAsyncHandler(async (req, res) => {
    const categories = await ProductCategory.find({});
    res.send(categories);
  })
);

categoryRouter.get(
  '/category/:id',
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const category = await ProductCategory.findById(req.params.id);
    if (category) {
      res.send(category);
    } else {
      res.status(404).send({ message: 'Category Not Found' });
    }
  })
);

//Admin portal > Create category

categoryRouter.post(
  '/create-category',
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const newCategory = new ProductCategory({
      categoryName: req.body.categoryName,
      categoryDescription: req.body.categoryDescription,
      categoryStatus: req.body.categoryStatus,
      img: req.body.img,
    });

    const category = await newCategory.save();
    res.status(201).send({ message: 'New Store Created', category });
  })
);

//User portal > CategoryEditScreen.js > Edit category
categoryRouter.put(
  '/category/:id',
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const categoryId = req.params.id;
    const category = await ProductCategory.findById(categoryId);

    if (category) {
      category.categoryName = req.body.categoryName || category.categoryName;
      category.categoryDescription =
        req.body.categoryDescription || category.categoryDescription;
      category.categoryStatus =
        req.body.categoryStatus || category.categoryStatus;
      category.img = req.body.img || category.img;
      const updatedCategory = await category.save();
      res.send(updatedCategory);
    } else {
      res.status(404).send({ message: 'Category Not Updated' });
    }
  })
);

export default categoryRouter;
