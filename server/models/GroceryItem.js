const mongoose = require('mongoose');

const GroseryItemSchema = {
    name: String,
    purchased: Boolean,
    id: String
};

const GroceryItem = mongoose.model('GroseryItem', GroseryItemSchema, "groceryItems");
module.exports = GroceryItem;