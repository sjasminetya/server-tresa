const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema
const propertySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    country: {
        type: String,
        default: "Indonesia"
    },
    city: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    isPopular: {
        type: Boolean
    },
    imageId: [{
        type: ObjectId,
        ref: "Image"
    }],
    featureId: [{
        type: ObjectId,
        ref: "Feature"
    }],
    activityId: [{
        type: ObjectId,
        ref: "Activity"
    }]
})

module.exports = mongoose.model("Property", propertySchema)