import mongoose from 'mongoose';

const productOrderSchema = new mongoose.Schema(
    {
        //orderId: { type: Number, required: true },
        //modelId: { type: Number, required: true },
        productCategoryId: { type: mongoose.Schema.Types.ObjectId, ref: 'ProductCategory', required: true },
        productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
        orderQuatity: { type: Number, required: true },            
    },
    {
        timestamps: true
    }
);

const ProductOrder = mongoose.model("ProductOrder", productOrderSchema);
export default ProductOrder;
