import express from 'express';
import data from './data.js';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRouter from './routers/userRouter.js';
import seedRouter from './routers/seedRouter.js';
import productRouter from './routers/productRouter.js';
import categoryRouter from './routers/categoryRouter.js';

dotenv.config();

//connect to mongodb
mongoose
    .connect(process.env.MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        dbName: 'zealcraft-database'
    })
    .then(() => {
        console.log('Database connection is ready..');
    })
    .catch((err) => {
        console.log(err.message);
    });

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use('/api/seed', seedRouter);
app.use('/api/users', userRouter);
app.use('/api/products', productRouter);
app.use('/api/category', categoryRouter);
//app.use('/api/admin', adminRouter);







app.use((err, req, res, next) => {
    res.status(500).send({ message: err.message });
});


app.get('/', (req, res) => {
    res.send('Server is ready..');
});


const port = process.env.PORT || 5000;
app.listen(5000, () => {
    console.log(`served at http://localhost:${port}`);
});