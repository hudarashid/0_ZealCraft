import mongoose from 'mongoose';

const deliveryLocationSchema = new mongoose.Schema(
    {
        postalCode: { type: String, required: true },
        deliveryFee: { type: Number, required: true },
        storeId: { type: mongoose.Schema.Types.ObjectId, ref: 'Store', required: true }
    },
    {
        timestamps: true
    }
);

const DeliveryLocation = mongoose.model("DeliveryLocation", deliveryLocationSchema);
export default DeliveryLocation;