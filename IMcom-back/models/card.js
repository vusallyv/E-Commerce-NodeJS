const { timeStamp } = require('console');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const cardSchema = new Schema({
    products: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Product'
        }
    ],
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
}, timeStamp = true);

module.exports = mongoose.model('Card', cardSchema);