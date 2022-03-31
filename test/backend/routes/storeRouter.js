import bcrypt from 'bcryptjs';
import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import User from '../models/userModel.js';
import { generateToken } from '../utils.js';
import { isAuth, isAdmin } from '../utils.js';
import multer from 'multer';
import path from 'path';
import Store from '../models/storeModel.js';

const storeRouter = express.Router();

storeRouter.get('/mystores', async (req, res) => {
  const stores = await Store.find(req.user);
  res.send(products);
});

export default storeRouter;
