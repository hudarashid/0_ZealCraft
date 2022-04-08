import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import Order from '../models/orderModel.js';
import { isAuth } from '../utils.js';

const orderRouter = express.Router();

orderRouter.get(
  '/orders',
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const orders = await Order.find().populate('customer', 'firstName');
    res.send(orders);
  })
);

orderRouter.post(
  '/',
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const newOrder = new Order({
      orderItems: req.body.orderItems.map((x) => ({ ...x, product: x._id })),
      shippingAddress: req.body.shippingAddress,
      paymentMethod: req.body.paymentMethod,
      currentPrice: req.body.currentPrice,
      shippingPrice: req.body.shippingPrice,
      taxPrice: req.body.taxPrice,
      totalPrice: req.body.totalPrice,
      customer: req.user._id,
    });
    const order = await newOrder.save();
    res.status(201).send({ message: 'New Order Created ', order });
  })
);

orderRouter.get(
  '/mine',
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const orders = await Order.find({ customer: req.user._id });
    res.send(orders);
  })
);

orderRouter.get(
  '/:id',
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id);
    if (order) {
      res.send(order);
    } else {
      res.status(404).send({ message: 'Order Not Found' });
    }
  })
);
orderRouter.put(
  '/:id',
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id);
    if (order) {
      order.isDelivered = req.body.isDelivered || order.isDelivered;
      // if (order.body.isDelivered === true) {
      //   order.deliveredAt = Date.now();
      // }
      const updatedOrder = await order.save();
      res.send({ message: 'Order Updated', order: updatedOrder });
    } else {
      res.status(404).send({ message: 'Order Not Found' });
    }
  })
);

orderRouter.put(
  '/:id/pay',
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id);
    if (order) {
      order.isPaid = true;
      order.paidAt = Date.now();
      order.paymentResult = {
        id: req.body.id,
        status: req.body.status,
        update_time: req.body.update_time,
        email_address: req.body.email_address,
      };
      const updatedOrder = await order.save();
      res.send({ message: 'Order Paid', order: updatedOrder });
    } else {
      res.status(404).send({ message: 'Order Not Found' });
    }
  })
);

// orderRouter.get(
//   '/userorders',
//   isAuth,
//   expressAsyncHandler(async (req, res) => {
//     const orders = await Order.find({ userId: req.user._id });
//     res.send(orders);
//   })
// );

// orderRouter.get('/orders', async (req, res) => {
//   const orders = await Order.find();
//   res.send(orders);
// });

export default orderRouter;
