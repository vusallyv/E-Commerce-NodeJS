const express = require('express');
const { body } = require('express-validator/check');

const cardController = require('../controllers/card');
const isAuth = require('../middleware/is-auth');

const router = express.Router();

// GET /feed/cards
router.get('/cards', isAuth, cardController.getCard);

// POST /feed/card
router.post(
  '/card',
  isAuth,
  cardController.addToBasket
);

// router.get('/card/:cardId', isAuth, cardController.getPost);

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
  cardController.updateBasket
);

// router.delete('/card/:cardId', isAuth, cardController.deletePost);

module.exports = router;
