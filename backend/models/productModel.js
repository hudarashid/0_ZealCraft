const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
    {
        name: String,
        image: String,
        countInStock: {
            type: Number,
            required: true,
        }
    },
    {
        timestamps: true,
    }
);
exports.Product = mongoose.model('Product', productSchema);

