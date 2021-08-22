var mongoose = require('mongoose');

var productSchema = mongoose.Schema({
    name: String,
    price: Number,
    availability: String, //In Stock or Out-Of-Stock
    quantity: Number,
    image: String,
    brand: String,
    size: String,
    category: String,
    SKU: String,
    date_added: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Product', productSchema);