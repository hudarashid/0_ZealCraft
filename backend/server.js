import express from 'express';
import data from './data.js';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRouter from './routers/userRouter.js';
import seedRouter from './routers/seedRouter.js';

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


app.use('/api/seed', seedRouter);
app.use('/api/users', userRouter);

app.get('/api/products', (req, res) => {
    res.send(data.products);
});

app.get('/api/categories', (req, res) => {
    res.send(data.categories);
});




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