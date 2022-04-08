import mongoose from 'mongoose';

const discountModelSchema = new mongoose.Schema(
    {
        discountName: { type: String },
        discountCode: { type: String },
        startDate: { type: Date },
        endDate: { type: Date },
        discountStatus: { type: String },
        storeId: { type: mongoose.Schema.Types.ObjectId, ref: 'Store', required: true }
    },
    {
        timestamps: true
    }
);

const Discount = mongoose.model("Discount", discountModelSchema);
export default Discount;