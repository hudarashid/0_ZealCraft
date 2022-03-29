import mongoose from 'mongoose';

const deliveryLocationSchema = new mongoose.Schema(
    {
        shippingAddress: {
            fullName: { type: String, required: true },
            address: { type: String, required: true },
            city: { type: String, required: true },
            postalCode: { type: String, required: true },
            country: { type: String, required: true },
          }, 
        shippingPrice: { type: Number, required: true },  
        isDelivered: { type: Boolean, default: false },
        deliveredAt: { type: Date },
        storeId: { type: mongoose.Schema.Types.ObjectId, ref: 'Store', required: true }
    },
    {
        timestamps: true
    }
);

const DeliveryLocation = mongoose.model("DeliveryLocation", deliveryLocationSchema);
export default DeliveryLocation;