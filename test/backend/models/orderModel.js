import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema(
    {
        //orderId: { type: Number, required: true },
        orderDate: { type: Date, required: true },
        orderStatus: { type: String, required: true },
        deliveryInstructions: { type: String, required: true },
        totalPrice: { type: Number, required: true },
        customerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Customer', required: true },
        userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    },
    {
        timestamps: true
    }
);

const Order = mongoose.model("Order", orderSchema);
export default Order;
