import express from 'express';
import data from '../data.js';
import User from '../models/userModel.js';
import Product from '../models/productModel.js';
import ProductCategory from '../models/productCategoryModel.js';
import mongoose from 'mongoose';

const toId = mongoose.Types.ObjectId;

const seedRouter = express.Router();

seedRouter.get('/', async (req, res) => {
    await ProductCategory.remove({});
    const createdProductCategory = await ProductCategory.insertMany(data.productCategory);

    await Product.remove({});
    const createdProduct = await Product.insertMany(data.products);

    await User.remove({});
    const createdUser = await User.insertMany(data.users);

    res.send({ createdUser, createdProduct, createdProductCategory });
});

seedRouter.get('/products', (req, res) => {
    res.send(data.products);
});



// seedRouter.get('/products/search', (req, res) => {
//     const { q } = req.query;

//     const keys = ["productName", "productCategory"];

//     const search = (items) => {
//         return items.filter((item) =>
//             keys.some((key) => item[key].toLowerCase().includes(q))
//         );
//     }

//     res.send(search(data.products));
// });



seedRouter.get('/categories', (req, res) => {

    res.send(data.categories);
});

export default seedRouter;