const fs = require('fs');
const path = require('path');

const { validationResult } = require('express-validator/check');

const Card = require('../models/card');
const User = require('../models/user');
// const { log } = require('console');

exports.getCard = (req, res, next) => {
  User.findById(req.userId).then(user => {
    if (!user) {
      const error = new Error('Could not find user.');
      error.statusCode = 404;
      throw error;
    } else {
      Card.findOne({ user: req.userId }).populate('productVersions.productVersionId')
      .then(card => {
        if (!card) {
          const error = new Error('Could not find card.');
          error.statusCode = 404;
          throw error;
        } else {
          res.status(200).json({
            message: 'Card fetched successfully!',
            card: card,
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
  // .then(cards => {
  //     res.status(200).json({
  //       message: 'Fetched cards successfully.',
  //       cards: cards,
  //       totalItems: totalItems
  //     });
  //   })
  //   .catch(err => {
  //     if (!err.statusCode) {
  //       err.statusCode = 500;
  //     }
  //     next(err);
  //   });
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
      Card.findOne({ user: req.body.userId }).then(card => {
        if (!card) {
          card = new Card({
            productVersions: [],
            user: req.body.userId,
          });
          card.productVersions.push({
            productVersionId: req.body.productVersionId,
            quantity: req.body.quantity || 1,
          });
          card.save();
          res.status(201).json({
            message: 'Card added successfully!',
            card: card,
          });
        } else {
          const productVersion = card.productVersions.find(
            pv => pv.productVersionId == req.body.productVersionId
          );
          if (!productVersion) {
            console.log('productVersion');
            card.productVersions.push({
              productVersionId: req.body.productVersionId,
              quantity: req.body.quantity || 1,
            });
          } else {
            productVersion.quantity += 1;
          }
          card.save();
          res.status(201).json({
            message: 'Card updated successfully!',
            card: card,
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
  // const card = new Card({
  //   title: title,
  //   content: content,
  //   imageUrl: imageUrl,
  //   creator: req.userId
  // });
  // card
  //   .save()
  //   .then(result => {
  //     return User.findById(req.userId);
  //   })
  //   .then(user => {
  //     creator = user;
  //     user.cards.push(card);
  //     return user.save();
  //   })
  //   .then(result => {
  //     res.status(201).json({
  //       message: 'Card created successfully!',
  //       card: card,
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

// exports.getCard = (req, res, next) => {
//   const cardId = req.params.cardId;
//   Card.findById(cardId)
//     .then(card => {
//       if (!card) {
//         const error = new Error('Could not find card.');
//         error.statusCode = 404;
//         throw error;
//       }
//       res.status(200).json({ message: 'Card fetched.', card: card });
//     })
//     .catch(err => {
//       if (!err.statusCode) {
//         err.statusCode = 500;
//       }
//       next(err);
//     });
// };

exports.updateBasket = (req, res, next) => {
  const cardId = req.params.cardId;
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
  Card.findById(cardId)
    .then(card => {
      if (!card) {
        const error = new Error('Could not find card.');
        error.statusCode = 404;
        throw error;
      }
      if (card.creator.toString() !== req.userId) {
        const error = new Error('Not authorized!');
        error.statusCode = 403;
        throw error;
      }
      if (imageUrl !== card.imageUrl) {
        clearImage(card.imageUrl);
      }
      card.title = title;
      card.imageUrl = imageUrl;
      card.content = content;
      return card.save();
    })
    .then(result => {
      res.status(200).json({ message: 'Card updated!', card: result });
    })
    .catch(err => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

// exports.deleteCard = (req, res, next) => {
//   const cardId = req.params.cardId;
//   Card.findById(cardId)
//     .then(card => {
//       if (!card) {
//         const error = new Error('Could not find card.');
//         error.statusCode = 404;
//         throw error;
//       }
//       if (card.creator.toString() !== req.userId) {
//         const error = new Error('Not authorized!');
//         error.statusCode = 403;
//         throw error;
//       }
//       // Check logged in user
//       clearImage(card.imageUrl);
//       return Card.findByIdAndRemove(cardId);
//     })
//     .then(result => {
//       return User.findById(req.userId);
//     })
//     .then(user => {
//       user.cards.pull(cardId);
//       return user.save();
//     })
//     .then(result => {
//       res.status(200).json({ message: 'Deleted card.' });
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
