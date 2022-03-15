import express from 'express';
import data from './data.js';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRouter from './routers/userRouter.js';

// dotenv.config();

const app = express();

//connect to mongodb
mongoose.connect(process.env.CONNECTION_STRING || 'mongodb://localhost/zealcraft', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: 'zealcraft-database'
}).then(() => {
    console.log('Database connection is ready..');
}).catch((err) => {
    console.log(err);
});


app.get('/api/products', (req, res) => {
    res.send(data.products);
});

//Router
app.use('/api/users', userRouter);


app.use((err, req, res, next) => {
    res.status(500).send({ message: err.message });
});


//middleware
// app.use(bodyParser.json());
// app.use(morgan('tiny'));

//Routers
// app.use(`${api}/products`, productRouter);





app.get('/', (req, res) => {
    res.send('Server is ready..');
});


const port = process.env.PORT || 5000
app.listen(5000, () => {
    console.log(`served at http://localhost:${port}`);
});