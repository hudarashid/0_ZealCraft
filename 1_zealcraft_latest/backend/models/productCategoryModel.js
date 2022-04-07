import mongoose from 'mongoose';

const productCategorySchema = new mongoose.Schema(
  {
    //categoryId: { type: Number, required: true },
    categoryName: { type: String, required: true },
    categoryDescription: { type: String, required: true },
    categoryStatus: { type: String, required: true },
    img: { type: String },
  },
  {
    timestamps: true,
  }
);

const ProductCategory = mongoose.model(
  'ProductCategory',
  productCategorySchema
);
export default ProductCategory;
