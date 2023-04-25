const express = require('express');
const guestSession = require('../sessionmiddleware');
const session = require('express-session');
const Cart = require('../db/index');
const CartItems = require('../db/index');
const User = require('../db/index');
const router = express.Router();

router.use(guestSession);

router.post('/', (req, res) => {
  const cart = req.session.cart || [];
  const newItem = { id: req.body.productId, quantity: req.body.quantity };
  cart.push(newItem);
  req.session.cart = cart;
  res.json({ success: true, message: 'Item added to cart.' });
});

router.post('/add', async (req, res) => {
    try {
      if (!req.session.cartId) {
        const cart = await Cart.create();
        req.session.cartId = cart.id;
      }
  
      // retrieve the cart from the database
      const cart = await Cart.findByPk(req.session.cartId);
  
      // create a new cart item with the provided data
      const { productId, quantity } = req.body;
      const cartItem = await CartItem.create({
        productId,
        quantity,
      });
  
      // associate the cart item with the cart
      await cart.addCartItem(cartItem);
  
      res.status(201).json({ message: 'Cart item added successfully.' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error.' });
    }
  });
  
  // API endpoint for associating a guest cart with a user account
  router.post('/associate', async (req, res) => {
    try {
      // retrieve the user from the database
      const user = await User.findOne({
        where: { username: req.body.username },
      });
  
      if (!user) {
        return res.status(400).json({ message: 'Invalid username.' });
      }
  
      // retrieve the guest cart from the session data
      const cart = await Cart.findByPk(req.session.cartId, {
        include: [CartItem],
      });
  
      if (!cart) {
        return res.status(404).json({ message: 'Cart not found.' });
      }
  
      // associate the cart items with the user's account
      await Promise.all(
        cart.cartItems.map((cartItem) =>
          cartItem.update({ cartId: null, userId: user.id })
        )
      );
  
      // destroy the guest cart
      await cart.destroy();
  
      res.status(200).json({ message: 'Cart associated successfully.' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error.' });
    }
  });
  
  router.delete('/delete/:itemId', async (req, res) => {
    const { itemId } = req.params;
    const { userId } = req.session;
  
    try {
      const cart = await Cart.findOne({ where: { userId } });
      if (!cart) {
        return res.status(400).json({ message: 'Cart not found.' });
      }
  
      const cartItem = await CartItems.findOne({
        where: { cartId: cart.id, productId: itemId },
      });
      if (!cartItem) {
        return res.status(400).json({ message: 'Item not found in cart.' });
      }
  
      await cartItem.destroy();
      res.json({ message: 'Item removed from cart.' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error.' });
    }
  });

  router.post('/cart/update/:productId', (req, res) => {
    const productId = req.params.productId;
    const quantity = req.body.quantity;
  
    // Check if cart exists in session
    if (!req.session.cart) {
      req.session.cart = [];
    }
  
    // Check if product already exists in cart
    let productExists = false;
    for (let i = 0; i < req.session.cart.length; i++) {
      if (req.session.cart[i].productId === productId) {
        productExists = true;
        req.session.cart[i].quantity = quantity;
        break;
      }
    }
  
    // If product doesn't exist in cart, add it
    if (!productExists) {
      req.session.cart.push({ productId, quantity });
    }
  
    res.json({ success: true });
  });
  
  module.exports = router;
