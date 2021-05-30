const mongoose = require("mongoose");
const bankSchema = new mongoose.Schema({
    bank: {
        type: String,
        required: true
    },
    imageUrl: {
        type: String
    },
    rekening: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model("Bank", bankSchema)