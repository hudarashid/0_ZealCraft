import mongoose from 'mongoose';

const productSchema = new mongoose.Schema(
    {
        //modelId: { type: Number, required: true },
        //slug: { type: String, required: true, unique: true },
        productName: { type: String, required: true },
        productDescription: { type: String, required: true },
        image: { type: String, required: true },
        images: [String],
        unitOfMeasure: { type: String, required: true },
        quantityOnHand: { type: Number, required: true },
        weight: { type: Number, required: true },
        currentPrice: { type: Number, required: true },
        discountedPrice: { type: Number },
        isFeatured: { type: Boolean, required: true },
        productStatus: { type: String, required: true },
        //productCategoryId: { type: mongoose.Schema.Types.ObjectId, ref: 'ProductCategory' },
        productCategory: { type: String },
    },
    {
        timestamps: true,
    }
);

const Product = mongoose.model("Product", productSchema);
export default Product;

