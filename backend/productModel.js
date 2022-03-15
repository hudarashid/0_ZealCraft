import mongoose from 'mongoose';

const productSchema = new mongoose.Schema(
<<<<<<< HEAD
    {             
        product: {
            //modelId: { type: Number, required: true },
            productName: { type: String, required: true },
            productDescription: { type: String, required: true },
            images: {type: Image },
            unitOfMeasure: {type: String},
            quantityOnHand: {type: Number},
            weight: {type: Number},
            currentPrice: {type: Number, required: true},
            discountedPrice: {type: Number },
            isFeatured: {type: String, required: true},
            productStatus: {type: String, required: true},
            productCategoryId: { type: mongoose.Schema.Types.ObjectId, ref: 'ProductCategory', required: true },
        },
=======
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
>>>>>>> 5c6dd1833434b559d3b0bd70e75df35064447afa
    },

    {
        timestamps: true,
    }
);

<<<<<<< HEAD
const Product = mongoose.model('Product', productSchema);

export default Product;

=======
const Product = mongoose.model("Product", productSchema);
export default Product;
>>>>>>> 5c6dd1833434b559d3b0bd70e75df35064447afa

