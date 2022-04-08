import dotenv from 'dotenv';

dotenv.config();

export default {
    PORT: process.env.PORT || 5000,
    MONGODC_URL: process.env.MONGODB_URL || 'mongodb+srv://zealcraft:zealcraft@cluster0.jeqks.mongodb.net/zealcraft?retryWrites=true&w=majority',
    JWT_SECRET: process.env.JWT_SECRET || 'something secret',
    PAYPAL_CLIENT_ID: process.env.PAYPAL_CLIENT_ID || 'sb',
    accessKeyId: process.env.accessKeyId || 'accessKeyId',
    secretAccessKey: process.env.secretAccessKey || 'secretAccessKey',
}