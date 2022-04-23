const { timeStamp } = require('console');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const cartSchema = new Schema({
    productVersions: [
        {
            productVersionId: {
                type: Schema.Types.ObjectId,
                ref: 'ProductVersion',
                required: true
            },
            quantity: {
                type: Number,
                required: true
            },
        }
    ],
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
}, { timestamps: true }
);

module.exports = mongoose.model('Cart', cartSchema);