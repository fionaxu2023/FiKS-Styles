const router = require('express').Router()
const {Cart, Product, User,CartItems } = require('../db/index')

router.get("/:cartId", async (req, res, next) => {
  try {
    const cartId = req.params.cartId;
    const cartItems = await CartItems.findAll({
      where: { cartId: cartId },
      include: [Product],
    });
    res.json(cartItems);
  } catch (error) {
    next(error);
  }
});

router.post("/:userId/add", async (req, res, next) => {
  try {
    const userId = req.params.userId;
    const productId = req.body.productId;
    const quantity=req.body.quantity
    let userCart = await Cart.findOne({ where: { userId } });
    if (!userCart) {
      userCart = await Cart.create({ userId });
    }

    const [cartItem, created] = await CartItems.findOrCreate({
      where: { productId: productId, cartId: userCart.id, quantity:quantity },
      
    });

    if (!created) {
      cartItem.quantity = cartItem.quantity + quantity;
      await cartItem.save();
    }

    res.status(200).json(cartItem);
  } catch (error) {
    next(error);
  }
});




router.put("/:userId/update", async (req, res, next) => {
  try {
    const userId = req.params.userId;
    const productId = req.body.productId;
    const newQuantity = req.body.newQuantity;
    const userCart = await Cart.findOne({ where: { userId } });

    const cartItem = await CartItems.findOne({
      where: { porductId:productId, cartId: userCart.id },
    });

    if (cartItem) {
      cartItem.quantity = newQuantity;
      await cartItem.save();
      res.status(200).json(cartItem);
    } else {
      res.status(404).send("Cart item not found");
    }
  } catch (err) {
    next(err);
  }
});



router.delete("/:userId/remove", async (req, res, next) => {
  try {
    const userId = req.params.userId;
    const productId = req.body.productId;
    const userCart = await Cart.findOne({ where: { userId } });

    const cartItem = await CartItems.findOne({
      where: { productId: productId, cartId: userCart.id },
    });

    if (cartItem) {
      await cartItem.destroy();
      res.status(204).end();
    } else {
      res.status(404).send("Cart item not found");
    }
  } catch (err) {
    next(err);
  }
});

module.exports = router;
