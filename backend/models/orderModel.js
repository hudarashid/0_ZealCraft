import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema(
    {
        orderItems: [{
            orderDate: { type: Date, required: true },
            orderStatus: { type: String, required: true },
            deliveryInstructions: { type: String, required: true },
            totalPrice: { type: Number, required: true },
            customerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Customer', required: true },
            userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
            product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
        },],
        itemsPrice: { type: Number, required: true },
        shippingPrice: { type: Number, required: true },
        taxPrice: { type: Number, required: true },
        totalPrice: { type: Number, required: true },
        user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    },
    {
        timestamps: true
    }
);

const Order = mongoose.model("Order", orderSchema);
export default Order;
