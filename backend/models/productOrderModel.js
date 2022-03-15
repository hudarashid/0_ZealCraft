import mongoose from 'mongoose';

const productOrderSchema = new mongoose.Schema(
    {
        orderId: { type: Number, required: true },
        modelId: { type: Number, required: true },
        orderQuatity: { type: Number, required: true },            
    },
    {
        timestamps: true
    }
);

const ProductOrder = mongoose.model("ProductOrder", productOrderSchema);
export default ProductOrder;