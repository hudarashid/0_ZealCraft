import express from 'express';
import data from './data.js';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import bodyParser from 'body-parser';
import userRouter from './routes/userRouter.js';
import storeRouter from './routes/storeRouter.js';
import categoryRouter from './routes/categoryRouter.js';
import productRouter from './routes/productRouter.js';
// import storeRouter from './routes/storeRouter.js';
import seedRouter from './routes/seedRouter.js';
import path from 'path';
dotenv.config();

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('connected to db');
  })
  .catch((err) => {
    console.log(err.message);
  });

const app = express(); //Function that returns express app object.
app.use(express.json());
app.use(cors());
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

// app.use('/images', express.static(path.dirname('images')));
// app.use('/images', express.static(path.dirname('images')));

// app.use('/api/seed', seedRouter);
// app.get('/api/users', (req, res) => {
//   res.send(data.users);
// });
// app.use('/api/users', userRouter);
// app.use('/api/images', uploadRouter);
// app.use(express.static('/public/'));

app.use('/api/seed', seedRouter);
app.use('/api/ur', userRouter);
app.use('/api/cr', categoryRouter);
app.use('/api/sr', storeRouter);
app.use('/api/pr', productRouter);
// app.get('/api/products', (req, res) => {
//   res.send(data.products);
// });

// app.get('/api/categories', (req, res) => {
//   res.send(data.categories);
// });

const __dirname = path.resolve();
app.use(express.static(path.join(__dirname, '/frontend/build')));
app.get('*', (req, res) =>
  res.sendFile(path.join(__dirname, '/frontend/build/index.html'))
);

app.use((err, req, res, next) => {
  res.status(500).send({ message: err.message });
});
//test
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`serve at http://localhost:${port}`);
});
