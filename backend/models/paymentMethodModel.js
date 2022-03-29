import mongoose from 'mongoose';

const paymentMethodSchema = new mongoose.Schema(
    {
        paymentMethod: { type: String, required: true },
        paymentDetails: {
            accountName: { type: String, required: true },
            accountNumber: { type: Number, required: true },
            cardholderName: { type: String, required: true },
            cardholderNumber: { type: Number, required: true },
            expiryDate: { type: Date, required: true },
            cvc: { type: Number, required: true},            
        },
        customerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Customer' },
        userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        adminId: { type: mongoose.Schema.Types.ObjectId, ref: 'Admin' },        
        paymentResult: {
            id: String,
            status: String,
            update_time: String,
            email_address: String,
          },
        isPaid: { type: Boolean, default: false },
        paidAt: { type: Date },
    },
    {
        timestamps: true
    }
);

const PaymentMethod = mongoose.model("PaymentMethod", paymentMethodSchema);
export default PaymentMethod;