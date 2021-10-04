const mongoose = require("mongoose");

const postSchema = mongoose.Schema({
    categoryName: {type: String, required: true},
    numberOfImages: {type: Number, required: true},

});


module.exports = mongoose.model('Category', postSchema);