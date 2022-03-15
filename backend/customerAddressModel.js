import mongoose from 'mongoose';

const customerAddressSchema = new mongoose.Schema(
    {
        customerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Customer', required: true },
        postalCodeId: { type: mongoose.Schema.Types.ObjectId, ref: 'CustomerLocation', required: true },
        addressLine1: { type: String, required: true },
        addressLine2: { type: String, required: true },        
    },
    {
        timestamps: true
    }
);

const CustomerAddress = mongoose.model("CustomerAddress", customerAddressSchema);
export default CustomerAddress;