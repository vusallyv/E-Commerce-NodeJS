const fs = require('fs');
const path = require('path');

const { validationResult } = require('express-validator/check');

const Cart = require('../models/cart');
const User = require('../models/user');

exports.getCart = (req, res, next) => {
  User.findById(req.userId).then(user => {
    if (!user) {
      const error = new Error('Could not find user.');
      error.statusCode = 404;
      throw error;
    } else {
      Cart.findOne({ user: req.userId }).populate({
        path: 'productVersions.productVersionId',
        model: 'ProductVersion',
        populate: {
          path: 'productId',
          model: 'Product',
        },
      })
        .then(cart => {
          if (!cart) {
            const error = new Error('Could not find cart.');
            error.statusCode = 404;
            throw error;
          } else {
            res.status(200).json({
              message: 'Cart fetched successfully!',
              cart: cart,
            });
          }
        });
    }
  }).catch(err => {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  });
};

exports.addToBasket = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error('Validation failed, entered data is incorrect.');
    error.statusCode = 422;
    throw error;
  }
  // if (!req.file) {
  //   const error = new Error('No image provided.');
  //   error.statusCode = 422;
  //   throw error;
  // }
  User.findById(req.body.userId).then(user => {
    if (!user) {
      const error = new Error('Could not find user.');
      error.statusCode = 404;
      throw error;
    } else {
      Cart.findOne({ user: req.body.userId }).then(cart => {
        if (!cart) {
          cart = new Cart({
            productVersions: [],
            user: req.body.userId,
          });
          cart.productVersions.push({
            productVersionId: req.body.productVersionId,
            quantity: req.body.quantity || 1,
          });
          cart.save();
          res.status(201).json({
            message: 'Cart added successfully!',
            cart: cart,
          });
        } else {
          const productVersion = cart.productVersions.find(
            pv => pv.productVersionId == req.body.productVersionId
          );
          if (!productVersion) {
            console.log('productVersion');
            cart.productVersions.push({
              productVersionId: req.body.productVersionId,
              quantity: req.body.quantity || 1,
            });
          } else {
            productVersion.quantity += 1;
          }
          cart.save();
          res.status(201).json({
            message: 'Cart updated successfully!',
            cart: cart,
          });
        }
      });
    }
  }).catch(err => {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  });;
  // const imageUrl = req.file.path;
  // const title = req.body.title;
  // const content = req.body.content;
  // let creator;
  // const cart = new Cart({
  //   title: title,
  //   content: content,
  //   imageUrl: imageUrl,
  //   creator: req.userId
  // });
  // cart
  //   .save()
  //   .then(result => {
  //     return User.findById(req.userId);
  //   })
  //   .then(user => {
  //     creator = user;
  //     user.carts.push(cart);
  //     return user.save();
  //   })
  //   .then(result => {
  //     res.status(201).json({
  //       message: 'Cart created successfully!',
  //       cart: cart,
  //       creator: { _id: creator._id, name: creator.name }
  //     });
  //   })
  // .catch(err => {
  //   if (!err.statusCode) {
  //     err.statusCode = 500;
  //   }
  //   next(err);
  // });
};

// exports.getCart = (req, res, next) => {
//   const cartId = req.params.cartId;
//   Cart.findById(cartId)
//     .then(cart => {
//       if (!cart) {
//         const error = new Error('Could not find cart.');
//         error.statusCode = 404;
//         throw error;
//       }
//       res.status(200).json({ message: 'Cart fetched.', cart: cart });
//     })
//     .catch(err => {
//       if (!err.statusCode) {
//         err.statusCode = 500;
//       }
//       next(err);
//     });
// };

exports.updateBasket = (req, res, next) => {
  const cartId = req.params.cartId;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error('Validation failed, entered data is incorrect.');
    error.statusCode = 422;
    throw error;
  }
  const title = req.body.title;
  const content = req.body.content;
  let imageUrl = req.body.image;
  if (req.file) {
    imageUrl = req.file.path;
  }
  if (!imageUrl) {
    const error = new Error('No file picked.');
    error.statusCode = 422;
    throw error;
  }
  Cart.findById(cartId)
    .then(cart => {
      if (!cart) {
        const error = new Error('Could not find cart.');
        error.statusCode = 404;
        throw error;
      }
      if (cart.creator.toString() !== req.userId) {
        const error = new Error('Not authorized!');
        error.statusCode = 403;
        throw error;
      }
      if (imageUrl !== cart.imageUrl) {
        clearImage(cart.imageUrl);
      }
      cart.title = title;
      cart.imageUrl = imageUrl;
      cart.content = content;
      return cart.save();
    })
    .then(result => {
      res.status(200).json({ message: 'Cart updated!', cart: result });
    })
    .catch(err => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

// exports.deleteCart = (req, res, next) => {
//   const cartId = req.params.cartId;
//   Cart.findById(cartId)
//     .then(cart => {
//       if (!cart) {
//         const error = new Error('Could not find cart.');
//         error.statusCode = 404;
//         throw error;
//       }
//       if (cart.creator.toString() !== req.userId) {
//         const error = new Error('Not authorized!');
//         error.statusCode = 403;
//         throw error;
//       }
//       // Check logged in user
//       clearImage(cart.imageUrl);
//       return Cart.findByIdAndRemove(cartId);
//     })
//     .then(result => {
//       return User.findById(req.userId);
//     })
//     .then(user => {
//       user.carts.pull(cartId);
//       return user.save();
//     })
//     .then(result => {
//       res.status(200).json({ message: 'Deleted cart.' });
//     })
//     .catch(err => {
//       if (!err.statusCode) {
//         err.statusCode = 500;
//       }
//       next(err);
//     });
// };

const clearImage = filePath => {
  filePath = path.join(__dirname, '..', filePath);
  fs.unlink(filePath, err => console.log(err));
};
