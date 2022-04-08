import mongoose from 'mongoose';

const customerSchema = new mongoose.Schema(
    {
        firstName: { type: String, required: true },
        lastName: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        phone: { type: Number }
    },
    {
        timestamps: true
    }
);

const Customer = mongoose.model("Customer", customerSchema);
export default User;