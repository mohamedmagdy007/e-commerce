const express = require("express");
const Order = require("../models/orderModel");

const {isAuth} = require("../helpers/Token");
const orderRouter = express.Router();

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
orderRouter.get("/:id",isAuth, async(req,res)=>{
  const order = await Order.findById(req.params.id)
  if(order){
    res.send(order)
  }else{
    res.status(404).send({message:'Order Not Found'})
  }
})
module.exports = orderRouter;
