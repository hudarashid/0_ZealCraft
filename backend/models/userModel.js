import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
    {
        firstName: { type: String, required: true },
        lastName: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        address: { type: String, required: true },
        city: { type: String, required: true },
        postalCode: { type: String, required: true },
        country: { type: String, required: true },
        isAdmin: { type: Boolean, default: false, required: true }
    },
    {
        timestamps: true
    }
);

const User = mongoose.model("User", userSchema);
export default User;