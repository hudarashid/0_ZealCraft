import mongoose from 'mongoose';

const customerLocationSchema = new mongoose.Schema(
    {
        postalCode: { type: String, required: true },
        city: { type: String, required: true },
        country: { type: String, required: true },       
    },
    {
        timestamps: true
    }
);

const CustomerLocation = mongoose.model("CustomerLocation", customerLocationSchema);
export default CustomerLocation;