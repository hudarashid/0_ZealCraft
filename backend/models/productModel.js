import mongoose from 'mongoose';

const productSchema = new mongoose.Schema(
    {
        modelId: { type: Number, required: true },
        productName: { type: String, required: true },
        productDescription: { type: String, required: true },
        images: { type: Image },
        unitOfMeasure: { type: String },
        quantityOnHand: { type: Number },
        weight: { type: Number },
        currentPrice: { type: Number, required: true },
        discountedPrice: { type: Number },
        isFeatured: { type: String, required: true },
        productStatus: { type: String, required: true },
        categoryId: { type: Number, required: true },
    },
    {
        timestamps: true,
    }
);

const Product = mongoose.model("Product", productSchema);
export default Product;

