const express = require('express');
const cartRouter = express.Router();
const Cartmodel = require('../models/cart.model');
const auth = require('../middleware/auth.middleware');

cartRouter.use(auth);

cartRouter.get('/', async (req, res) => {
  try {
    const userID = String(req.body.userID);
    const data = await Cartmodel.find({ userID });
    res.send(data);
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: error.message });
  }
});

cartRouter.post('/addtocart', async (req, res) => {
  const { title, image, price } = req.body;
  const userID = String(req.body.userID);
  try {
    const existing = await Cartmodel.findOne({ userID, title });
    if (existing) {
      existing.quantity = (existing.quantity || 1) + 1;
      await existing.save();
      return res.send(existing);
    }
    const item = await Cartmodel.create({ title, image, price, userID, quantity: 1 });
    res.send(item);
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: error.message });
  }
});

cartRouter.patch('/update/:id', async (req, res) => {
  const quantity = Number(req.body.quantity);
  const userID = String(req.body.userID);
  try {
    if (!quantity || quantity < 1) {
      const removed = await Cartmodel.findOneAndDelete({ _id: req.params.id, userID });
      if (!removed) return res.status(404).send({ error: 'Item not found' });
      return res.send({ msg: 'Removed from cart' });
    }
    const item = await Cartmodel.findOneAndUpdate(
      { _id: req.params.id, userID },
      { quantity },
      { new: true }
    );
    if (!item) return res.status(404).send({ error: 'Item not found' });
    res.send(item);
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: error.message });
  }
});

cartRouter.delete('/clear', async (req, res) => {
  try {
    const userID = String(req.body.userID);
    await Cartmodel.deleteMany({ userID });
    res.send('Cart cleared');
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: error.message });
  }
});

cartRouter.delete('/delete/:id', async (req, res) => {
  try {
    const userID = String(req.body.userID);
    const removed = await Cartmodel.findOneAndDelete({ _id: req.params.id, userID });
    if (!removed) return res.status(404).send({ error: 'Item not found' });
    res.send({ msg: 'Deleted from cart' });
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: error.message });
  }
});

module.exports = cartRouter;
