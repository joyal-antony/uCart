import express from 'express';
import Order from '../models/orderModel';
import { isAuth, isAdmin } from '../util';

const validateOrderInput = require('../../Validation/NewOrder')


const router = express.Router();


router.get("/mine", isAuth, async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id })
    if (!orders) {
      res.status(400).send({ error: "No order Found" })
    } else {
      res.send(orders);
    }
  } catch (error) {
    res.status(500).send(error)
  }
});


router.get("/:id", isAuth, async (req, res) => {
  // NEED SOME MORE CLARITY
  const order = await Order.findById(req.params.id);
  if (order) {
    if (req.user._id == order.user) {
      res.send(order)
    }
    else {
      res.status(404).send("something went wrong")
    }
  }
  else {
    res.status(404).send("Order Not Found.")
  }
});


router.get("/", isAuth, isAdmin, async (req, res) => {
  const orders = await Order.find()
  try {
    // hide password
    res.send(orders);
  } catch (error) {
    res.send(error.message)
  }
});


router.delete("/:id", isAuth, async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (req.user._id == order.user) {
      if (order) {
        await order.remove();
        res.send("order deleted");
      }
      else {
        res.status(404).send("Order not found")
      }
    } else {
      res.status(404).send("Not your order")
    }
  } catch (error) {
    res.status(500).send(error)
  }
});


router.post("/", isAuth, async (req, res) => {
  // validation
  try {
    const { errors, isValid } = validateOrderInput(req.body)
    if (!isValid) {
      return res.status(400).json(errors);
    }
    const newOrder = new Order({
      user: req.user._id,
      orderItems: req.body.orderItems,
      shipping: req.body.shipping,
      payment: req.body.payment,
      itemsPrice: req.body.itemsPrice,
      taxPrice: req.body.taxPrice,
      shippingPrice: req.body.shippingPrice,
      totalPrice: req.body.totalPrice,
    });
    const newOrderCreated = await newOrder.save();
    if (!newOrderCreated) {
      res.status(400).send(error.message)
    }
    else {
      res.send(newOrderCreated);
    }
  } catch (error) {
    console.log(error)
    res.status(500).send(error.message)
  }
});


router.put("/:id/pay", isAuth, async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (order) {
      if (req.user._id == order.user) {
        // need to check if already paid
        if (order.isPaid === true) {
          res.send("already paid")
        }
        else {
          order.isPaid = true;
          order.paidAt = Date.now();
          // order.payment = {
          //     paymentMethod: 'paypal',
          //     paymentResult: {
          //         payerID: req.body.payerID,
          //         orderID: req.body.orderID,
          //         paymentID: req.body.paymentID
          //     }
          // }
          const updatedOrder = await order.save();
          res.send({ message: 'Order Paid.', order: updatedOrder });
        }
      } else {
        res.status(404).send({ message: 'not your order' })
      }
    } else {
      res.status(404).send({ message: 'Order not found.' })
    }
  } catch (error) {
    res.status(500).send(error)
  }
});



router.put("/:id/deliver", isAuth, isAdmin, async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (order) {
      if (order.isDelivered === true) {
        res.send("already Delivered")
      }
      else {
        order.isDelivered = true
        order.deliveredAt = Date.now()

        const updatedOrder = await order.save()

        res.json(updatedOrder)
      }
    } else {
      res.status(404).send({ message: 'Order not found.' })
    }
  } catch (error) {
    res.status(500).send(error)
  }
});

export default router;