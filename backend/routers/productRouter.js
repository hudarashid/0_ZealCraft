import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import Product from '../models/productModel.js';
import ProductCategory from '../models/productCategoryModel.js';
import { isAuth, isUser, isAdmin } from '../utils.js';
import multer from 'multer';
//import { json } from 'body-parser';

const productRouter = express.Router();
const cloudinary = "../cloudinary";
const upload = multer();

productRouter.get('/', async (req, res) => {
  const products = await Product.find();
  res.send(products);
  res.json(products);
});

productRouter.post(
  '/',
  isAuth,
  isAdmin,
  isUser,
  upload.single('image'),
  expressAsyncHandler(async (req, res) => {
    const result = await cloudinary.uploader.upload(req.file.path);
    const newProduct = new Product({
      name: req.body.name,
      slug: req.body.slug,
      description: req.body.description,
      image: result.secure_url,
      unitOfMeasure: req.body.unitOfMeasure,
      quantityOnHand: req.body.quantityOnHand,
      weight: req.body.weight,
      currentPrice: req.body.currentPrice,
      discountedPrice: req.body.discountedPrice,
      isFeatured: req.body.isFeatured,
      productStatus: req.body.productStatus,
      productCategory: req.body.productCategory,
    });
    const product = await newProduct.save();
    res.json(product);
    res.send({ message: 'Product Created', product });
  })
);

productRouter.put(
  '/:id',
  isAuth,
  isAdmin,
  isUser,
  upload.single('image'),
  expressAsyncHandler(async (req, res) => {
    const productId = req.params.id;
    //await cloudinary.uploader.destroy(user.cloudinary_id); // Delete image from cloudinary
    //const result;
    //if (req.file) {
      //result = await cloudinary.uploader.upload(req.file.path);}
    const product = await Product.findById(productId);
    await cloudinary.uploader.destroy(user.cloudinary_id); // Delete image from cloudinary
    const result = await cloudinary.uploader.upload(req.file.path);
    if (product) {
      product.name = req.body.name;
      product.slug = req.body.slug;
      product.description = req.body.description;
      product.image = result.secure_url || product.image;
      product.unitOfMeasure = req.body.unitOfMeasure;
      product.quantityOnHand = req.body.quantityOnHand;
      product.weight = req.body.weight;
      product.currentPrice = req.body.currentPrice;
      product.discountedPrice = req.body.discountedPrice;
      product.isFeatured = req.body.isFeatured;
      product.productStatus = req.body.productStatus;
      product.productCategory = req.body.productCategory;
      product.cloudinary_id = result.public_id || product.cloudinary_id;
      await product.save();
      product = await product.finByIdAndUpdate(req.params.id, product, {new: true });
      res.json(product);
      res.send({ message: 'Product Updated' });
    } else {
      res.status(404).send({ message: 'Product Not Found' });
    }
  })
);

productRouter.delete(
  '/:id',
  isAuth,
  isAdmin,
  isUser,
  expressAsyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);
    if (product) {
      await cloudinary.uploader.destroy(product.cloudinary_id); //Delete cloudinary image
      await product.remove();
      res.send({ message: 'Product Deleted' });
    } else {
      res.status(404).send({ message: 'Product Not Found' });
    }
  })
);

const PAGE_SIZE = 3;

productRouter.get(
  '/admin',
  isAuth,
  isAdmin,
  isUser,
  expressAsyncHandler(async (req, res) => {
    const { query } = req;
    const page = query.page || 1;
    const pageSize = query.pageSize || PAGE_SIZE;

    const products = await Product.find()
      .skip(pageSize * (page - 1))
      .limit(pageSize);
    const countProducts = await Product.countDocuments();
    res.send({
      products,
      countProducts,
      page,
      pages: Math.ceil(countProducts / pageSize),
    });
  })
);

productRouter.get(
  '/search',
  expressAsyncHandler(async (req, res) => {
    const { query } = req;
    const pageSize = query.pageSize || PAGE_SIZE;
    const page = query.page || 1;
    const productCategory = query.productCategory || '';
    const price = query.price || '';
    const rating = query.rating || '';
    const order = query.order || '';
    const searchQuery = query.query || '';

    const queryFilter =
      searchQuery && searchQuery !== 'all'
        ? {
            name: {
              $regex: searchQuery,
              $options: 'i',
            },
          }
        : {};
    const productCategoryFilter =
      productCategory && productCategory !== 'all' ? { productCategory } : {};
    const ratingFilter =
      rating && rating !== 'all'
        ? {
            rating: {
              $gte: Number(rating),
            },
          }
        : {};
    const priceFilter =
      price && price !== 'all'
        ? {
            // 1-50
            price: {
              $gte: Number(price.split('-')[0]),
              $lte: Number(price.split('-')[1]),
            },
          }
        : {};
    const sortOrder =
      order === 'featured'
        ? { featured: -1 }
        : order === 'lowest'
        ? { price: 1 }
        : order === 'highest'
        ? { price: -1 }
        : order === 'toprated'
        ? { rating: -1 }
        : order === 'newest'
        ? { createdAt: -1 }
        : { _id: -1 };

    const products = await Product.find({
      ...queryFilter,
      ...productCategoryFilter,
      ...priceFilter,
      ...ratingFilter,
    })
      .sort(sortOrder)
      .skip(pageSize * (page - 1))
      .limit(pageSize);

    const countProducts = await Product.countDocuments({
      ...queryFilter,
      ...productCategoryFilter,
      ...priceFilter,
      ...ratingFilter,
    });
    res.send({
      products,
      countProducts,
      page,
      pages: Math.ceil(countProducts / pageSize),
    });
  })
);

productRouter.get(
  '/productCategory',
  expressAsyncHandler(async (req, res) => {
    const productCategory = await Product.find().distinct('productCategory');
    res.send(productCategory);
  })
);

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
    res.json(product);
  } else {
    res.status(404).send({ message: 'Product Not Found' });
  }
});

export default productRouter;
