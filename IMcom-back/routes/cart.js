const express = require('express');
const { body } = require('express-validator/check');

const cartController = require('../controllers/cart');
const isAuth = require('../middleware/is-auth');

const router = express.Router();

// GET /feed/carts
router.get('/carts', isAuth, cartController.getCart);

// POST /feed/cart
router.post(
  '/cart',
  isAuth,
  cartController.addToBasket
);

// router.get('/cart/:cartId', isAuth, cartController.getPost);

router.put(
  '/cart/:cartId',
  isAuth,
  // [
  //   body('title')
  //     .trim()
  //     .isLength({ min: 5 }),
  //   body('content')
  //     .trim()
  //     .isLength({ min: 5 })
  // ],
  cartController.updateBasket
);

// router.delete('/cart/:cartId', isAuth, cartController.deletePost);

module.exports = router;
