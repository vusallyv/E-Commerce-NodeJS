const { timeStamp } = require('console');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productVersionSchema = new Schema({
    description: {
        type: String,
    },
    image: {
        type: String,
        required: true
    },
    color: {
        type: String,
        required: true
    },
    productId: {
        type: Schema.Types.ObjectId,
        ref: 'Product',
        required: true
      }
},
    { timestamps: true }
);

module.exports = mongoose.model('ProductVersion', productVersionSchema);