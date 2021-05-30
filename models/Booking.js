const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema
const bookingSchema = new mongoose.Schema({
    startDate: {
        type: Date,
        required: true
    },
    endDate: {
        type: Date,
        required: true
    },
    proofPayment: {
        type: String,
        required: true
    },
    bank: {
        type: String,
        required: true
    },
    accountHolder: {
        type: String,
        required: true
    },
    propertyId: [{
        _id: {
            type: ObjectId,
            ref: "Property",
            required: true
        },
        price: {
            type: Number,
            required: true
        },
        night: {
            type: Number,
            required: true
        }
    }],
    memberId: [{
        type: ObjectId,
        ref: "Member"
    }],
    bankId: [{
        type: ObjectId,
        ref: "Bank"
    }],
    status: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model("Booking", bookingSchema)