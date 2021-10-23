const express = require("express");
const Order = require("../models/orderModel");

const { isAuth, isAdmin } = require("../helpers/Token");
const orderRouter = express.Router();

orderRouter.get("/", isAuth, isAdmin, async (req, res) => {
  const orders = await Order.find({}).populate("user", "name");
  res.send(orders);
});

orderRouter.get("/mine", isAuth, async (req, res) => {
  const orders = await Order.find({ user: req.user._id });
  res.send(orders);
});
orderRouter.post("/", isAuth, async (req, res) => {
  if (req.body.orderItems.length === 0) {
    res.status(400).send({ message: "Cart is empty" });
  } else {
    const order = new Order({
      orderItems: req.body.orderItems,
      shippingAddress: req.body.shippingAddress,
      paymentMethod: req.body.paymentMethod,
      itemsPrice: req.body.itemsPrice,
      shippingPrice: req.body.shippingPrice,
      taxPrice: req.body.taxPrice,
      totalPrice: req.body.totalPrice,
      user: req.user._id,
    });
    const createOrder = await order.save();
    res.status(201).send({ message: "New Order Created", order: createOrder });
  }
});
orderRouter.get("/:id", isAuth, async (req, res) => {
  const order = await Order.findById(req.params.id);
  if (order) {
    res.send(order);
  } else {
    res.status(404).send({ message: "Order Not Found" });
  }
});
orderRouter.put("/:id/pay", isAuth, async (req, res) => {
  const order = await Order.findById(req.params.id);
  if (order) {
    order.isPaid = true;
    order.paidAt = date.now();
    order.paymentReuslt = {
      id: req.body.id,
      status: req.body.status,
      update_time: req.body.update_time,
      email_address: req.body.email_address,
    };
    const updatedOrder = await order.save();
    res.send({ message: "Order Paid", order: updatedOrder });
  } else {
    res.status(404).send({ message: "Order Not Found" });
  }
});
orderRouter.delete("/:id", isAuth, isAdmin, async (req, res) => {
  const order = await Order.findById(req.params.id);
  if (order) {
    const deleteOrder = await order.remove();
    res.send({ message: "Order Deleted", order: deleteOrder });
  } else {
    res.status(404).send({ message: "Order Not Found" });
  }
});
orderRouter.put(
  '/:id/deliver',
  isAuth,
  isAdmin,
  async (req, res) => {
    const order = await Order.findById(req.params.id);
    if (order) {
      order.isDelivered = true;
      order.deliveredAt = Date.now();

      const updatedOrder = await order.save();
      res.send({ message: 'Order Delivered', order: updatedOrder });
    } else {
      res.status(404).send({ message: 'Order Not Found' });
    }
  }
);
module.exports = orderRouter;
