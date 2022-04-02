import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import Product from '../models/productModel.js';
import ProductCategory from '../models/productCategoryModel.js';
import { isAuth, isAdmin } from '../utils.js';

const productRouter = express.Router();

productRouter.get('/', async (req, res) => {
    const products = await Product.find();
    res.send(products);
});

productRouter.get(
    '/productCategory',
    expressAsyncHandler(async (req, res) => {
        const productCategory = await Product.find().distinct('productCategory');
        res.send(productCategory);
    })
);

productRouter.get(
    '/search',
    expressAsyncHandler(async (req, res) => {
        const { query } = req;
        const productCategory = query.category || '';
        const searchQuery = query.query || '';
        const price = query.price || '';

        const queryFilter =
            searchQuery && searchQuery !== 'all'
                ? {
                    productName: {
                        $regex: searchQuery,
                        $options: 'i',
                    },
                }
                : {};

        const categoryFilter = productCategory && productCategory !== 'all' ? { productCategory } : {};
        const priceFilter =
            price && price !== 'all'
                ? {
                    // 1-50
                    currentPrice: {
                        $gte: Number(price.split('-')[0]),
                        $lte: Number(price.split('-')[1]),
                    },
                }
                : {};
        //console.log(categoryFilter);
        const products = await Product.find({
            ...queryFilter,
            ...categoryFilter,
            ...priceFilter
        });
        //console.log(products);
        const countProducts = await Product.countDocuments({
            ...queryFilter,
            ...categoryFilter,
            ...priceFilter
        })
        //console.log(countProducts);
        res.send({ products, countProducts });
    })

)

productRouter.get('/slug/:slug', async (req, res) => {
    const product = await Product.findOne({ slug: req.params.slug });
    if (product) {
        res.send(product);
    } else {
        res.status(404).send({ message: 'Product Not Found' });
    }
});

productRouter.get('/:id', async (req, res) => {
    const product = await Product.findById(req.params.id);
    if (product) {
        res.send(product);
    } else {
        res.status(404).send({ message: 'Product Not Found' });
    }
});

export default productRouter;