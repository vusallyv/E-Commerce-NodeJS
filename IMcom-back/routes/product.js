const express = require('express');
const blogController = require('../controllers/product');
const router = express.Router();

router.get('/products', blogController.getProducts);
router.post('/products', blogController.createProduct);
router.post('/productVersion', blogController.createProductVersion);
router.get('/product/:productId', blogController.getProduct);

module.exports = router;
