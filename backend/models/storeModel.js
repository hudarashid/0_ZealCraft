import mongoose from 'mongoose';

const storeSchema = new mongoose.Schema(
    {
        storeName: { type: String, required: true },
        storeDetail: { type: String },
        bannerImage: { type: String },
        additionalPhoto: { type: String },
        supportEmail: { type: String },
        storeRating: { type: Number },
        storeStatus: { type: String },
        supportPhone: { type: Number },
        userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
    },
    {
        timestamps: true
    }
);

const Store = mongoose.model("Store", storeSchema);
export default Store;