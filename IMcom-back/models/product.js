const { timeStamp } = require('console');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    brand: {
        type: String,
        required: true
    },
    productVersions: [
        {
            type: Schema.Types.ObjectId,
            ref: 'ProductVersion'
        }
    ],
},
    { timestamps: true }
);

module.exports = mongoose.model('Product', productSchema);