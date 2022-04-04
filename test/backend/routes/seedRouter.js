import express from 'express';
import data from '../data.js';
import User from '../models/userModel.js';
import Product from '../models/productModel.js';
import ProductCategory from '../models/productCategoryModel.js';
import Store from '../models/storeModel.js';

const seedRouter = express.Router();

seedRouter.get('/', async (req, res) => {
  await Product.remove({});
  const createdProduct = await Product.insertMany(data.products);
  // await Store.remove({});
  // const createdStore = await Store.insertMany(data.stores);
  // await ProductCategory.remove({});
  // const createdCategory = await ProductCategory.insertMany(
  //   data.productCategories
  // );
  // await User.remove({});
  // const createdUser = await User.insertMany(data.users);

  res.send({ createdProduct });
});

export default seedRouter;
