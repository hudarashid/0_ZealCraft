import mongoose from 'mongoose';

const faqSchema = new mongoose.Schema(
    {
        //faqId: { type: Number, required: true },
        question: { type: String, required: true },
        answer: { type: String },
        faqStatus: { type: String },
        storeId: { type: mongoose.Schema.Types.ObjectId, ref: 'Store', required: true },
    },
    {
        timestamps: true
    }
);

const FAQ = mongoose.model("ProductCategory", faqSchema);
export default FAQ;
