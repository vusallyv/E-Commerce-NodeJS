const express = require('express');
const { body } = require('express-validator/check');

const feedController = require('../controllers/card');
const isAuth = require('../middleware/is-auth');

const router = express.Router();

// GET /feed/cards
// router.get('/cards', isAuth, feedController.getPosts);

// POST /feed/card
router.post(
  '/card',
  isAuth,
  // [
  //   body('title')
  //     .trim()
  //     .isLength({ min: 5 }),
  //   body('content')
  //     .trim()
  //     .isLength({ min: 5 })
  // ],
  feedController.addToBasket
);

// router.get('/card/:cardId', isAuth, feedController.getPost);

router.put(
  '/card/:cardId',
  isAuth,
  [
    body('title')
      .trim()
      .isLength({ min: 5 }),
    body('content')
      .trim()
      .isLength({ min: 5 })
  ],
  feedController.updateBasket
);

// router.delete('/card/:cardId', isAuth, feedController.deletePost);

module.exports = router;
