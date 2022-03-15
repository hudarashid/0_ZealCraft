import mongoose from 'mongoose';

const paymentMethodSchema = new mongoose.Schema(
    {
        methodName: { type: String },
        accountName: { type: String },
        accountNumber: { type: Number },
        cardholderName: { type: String },
        cardholderNumber: { type: Number },
        expiryDate: { type: Date },
        cvc: { type: Number },
        customerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Customer' },
        userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        adminId: { type: mongoose.Schema.Types.ObjectId, ref: 'Admin' },
    },
    {
        timestamps: true
    }
);

const PaymentMethod = mongoose.model("PaymentMethod", paymentMethodSchema);
export default PaymentMethod;