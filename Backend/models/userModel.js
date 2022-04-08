import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    firstName: { type: String },
    lastName: { type: String },
    image: { type: String },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    address: { type: String },
    city: { type: String },
    postalCode: { type: String },
    country: { type: String },
    phone: { type: Number },
    isAdmin: { type: Boolean, default: false, required: true },
    isUser: { type: Boolean, default: false },
    isCustomer: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model('User', userSchema);
export default User;
