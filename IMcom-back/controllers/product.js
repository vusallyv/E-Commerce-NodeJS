const fs = require('fs');
const path = require('path');

const Product = require('../models/product');
const productVersion = require('../models/productVersion');
const ProductVersion = require('../models/productVersion');

exports.getProducts = (req, res, next) => {
    ProductVersion.find().populate('productId')
        .then(productVersions => {
            res.status(200).json({
                message: 'Fetched productversions successfully.',
                productVersions: productVersions,
            });
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
};


exports.getProduct = (req, res, next) => {
    const productId = req.params.productId;
    ProductVersion.findById(productId).populate('productId')
        .then(product => {
            if (!product) {
                const error = new Error('Could not find product.');
                error.statusCode = 404;
                throw error;
            }
            res.status(200).json({ message: 'product fetched.', product: product });
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
};



exports.createProduct = (req, res, next) => {
    // const errors = validationResult(req);
    // if (!errors.isEmpty()) {
    //   const error = new Error('Validation failed, entered data is incorrect.');
    //   error.statusCode = 422;
    //   throw error;
    // }
    // if (!req.file) {
    //   const error = new Error('No image provided.');
    //   error.statusCode = 422;
    //   throw error;
    // }
    const title = req.body.title;
    const price = req.body.price;
    const brand = req.body.brand;
    const product = new Product({
        title: title,
        price: price,
        brand: brand,
    });
    product
        .save()
        .then(result => {
            res.status(201).json({
                message: 'Product created successfully!',
                product: product,
            });
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
};

exports.createProductVersion = (req, res, next) => {
    // const errors = validationResult(req);
    // if (!errors.isEmpty()) {
    //   const error = new Error('Validation failed, entered data is incorrect.');
    //   error.statusCode = 422;
    //   throw error;
    // }
    // if (!req.file) {
    //   const error = new Error('No image provided.');
    //   error.statusCode = 422;
    //   throw error;
    // }
    const description = req.body.description;
    const image = req.body.image;
    const color = req.body.color;
    const productId = req.body.productId;
    const productVersion = new ProductVersion({
        description: description,
        image: image,
        color: color,
        productId: productId,
    });
    Product.findById(productId).then(product => {
        if (!product) {
            const error = new Error('Could not find product.');
            error.statusCode = 404;
            throw error;
        }
        productVersion.save().then(result => {
            product.productVersions.push(productVersion);
            product.save()
        });
    })
        .then(result => {
            res.status(201).json({
                message: 'ProductVersion created successfully!',
                productVersion: productVersion,
            });
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
};
