import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import Product from '../models/productModel.js';
import { generateToken } from '../utils.js';
import { isAuth, isAdmin } from '../utils.js';
import multer from 'multer';
import path from 'path';
import Store from '../models/storeModel.js';
import ProductCategory from '../models/productCategoryModel.js';

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
productRouter.get('/slug/:id', async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product) {
    res.send(product);
  } else {
    res.status(404).send({ message: 'Product Not Found' });
  }
});

productRouter.get('/product/:id', async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product) {
    res.send(product);
  } else {
    res.status(404).send({ message: 'Product Not Found' });
  }
});

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
    const categoryFilter =
      productCategory && productCategory !== 'all' ? { productCategory } : {};
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
      ...priceFilter,
    });
    //console.log(products);
    const countProducts = await Product.countDocuments({
      ...queryFilter,
      ...categoryFilter,
      ...priceFilter,
    });
    //console.log(countProducts);
    res.send({ products, countProducts });
  })
);

//User portal > ProductEditScreen.js > Fetch product detail based on product id
productRouter.get(
  '/products/:id',
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);
    if (product) {
      const category = await ProductCategory.findById(
        product.productCategoryId
      );
      const store = await Store.findById(product.storeId);
      res.send({ product, category, store });
      // console.log({ product, category, store });
    } else {
      res.status(404).send({ message: 'Product Not Found' });
    }
  })
);

//User portal > CreateProduct.js > Get categories and stores to show in dropdown
productRouter.get(
  '/categoriesandstores',
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const stores = await Store.find({ userId: req.user._id });
    const categories = await ProductCategory.find({});
    res.send({ stores, categories });
    console.log({ stores, categories });
    res.status(404).send({ message: 'Nothing Found' });
  })
);

//User portal > CreateProduct.js > Create product
productRouter.post(
  '/create/product',
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const newProduct = new Product({
      productName: req.body.productName,
      productDescription: req.body.productDescription,
      images: req.body.images,
      unitOfMeasure: req.body.unitOfMeasure,
      quantityOnHand: req.body.quantityOnHand,
      weight: req.body.weight,
      currentPrice: req.body.currentPrice,
      discountedPrice: req.body.discountedPrice,
      isFeatured: req.body.isFeatured,
      productStatus: req.body.productStatus,
      productCategoryId: req.body.productCategoryId,
      storeId: req.body.storeId,
    });
    const product = await newProduct.save();
    res.status(201).send({ message: 'New Product Created', product });
  })
);

//User portal > ProductEditScreen.js > Edit product
productRouter.put(
  '/products/:id',
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const productId = req.params.id;
    const product = await Product.findById(productId);

    if (product) {
      product.productName = req.body.productName || product.productName;
      product.productDescription =
        req.body.productDescription || product.productDescription;
      product.images = req.body.images || product.images;
      product.unitOfMeasure = req.body.unitOfMeasure || product.unitOfMeasure;
      product.quantityOnHand =
        req.body.quantityOnHand || product.quantityOnHand;
      product.weight = req.body.weight || product.weight;
      product.currentPrice = req.body.currentPrice || product.currentPrice;
      product.discountedPrice =
        req.body.discountedPrice || product.discountedPrice;
      product.isFeatured = req.body.isFeatured || product.isFeatured;
      product.productStatus = req.body.productStatus || product.productStatus;
      product.productCategoryId =
        req.body.productCategoryId || product.productCategoryId;
      product.productCategory =
        req.body.productCategory || product.productCategory;
      product.storeId = req.body.storeId || product.storeId;
      const updatedProduct = await product.save();
      res.send(updatedProduct);
    } else {
      res.status(404).send({ message: 'Product Not Updated' });
    }
  })
);

//User portal > ProductListScreen.js > To get products of one store based on store id
productRouter.get(
  '/:id/products',
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const storeId = req.params.id;
    // console.log(storeId);
    const products = await Product.find({ storeId });
    res.send(products);
  })
);

//User portal > ProductEditScreen.js > Delete product
productRouter.delete(
  '/products/:id',
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);
    if (product) {
      await product.remove();
      res.send({ message: 'Product deleted.' });
    } else {
      res.status(404).send({ message: 'Product Not Found' });
    }
  })
);

export default productRouter;
