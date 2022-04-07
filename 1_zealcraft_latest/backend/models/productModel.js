import mongoose from 'mongoose';

const productSchema = new mongoose.Schema(
  {
    //modelId: { type: Number, required: true },
    productName: { type: String, required: true },
    productDescription: { type: String, required: true },
    images: { type: String },
    images: [String],
    unitOfMeasure: { type: String, required: true },
    quantityOnHand: { type: Number, required: true },
    weight: { type: String, required: true },
    currentPrice: { type: Number, required: true },
    discountedPrice: { type: Number },
    isFeatured: { type: Boolean, required: true },
    productStatus: { type: String, required: true },
    productCategory: { type: String },
    productCategoryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'ProductCategory',
      required: true,
    },
    storeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Store',
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model('Product', productSchema);
export default Product;
