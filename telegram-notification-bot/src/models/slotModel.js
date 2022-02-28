const mongoose = require("mongoose");

const tgramSlotSchema = new mongoose.Schema({
    chat_id : {
        type: String,
        unique: true
    },
    last_updated: {
        type: String,
    },
    slots: [{
        session_id: String,
        date: {
            type: String,
            default: "Undefinded"
        },
        name: {
            type: String,
            default: "Undefinded"
        },
        address: {
            type: String,
            default: "Undefinded" 
        },       
        vaccineName: {
            type: String,
            default: "Undefinded" 
        },
        pincode: {
            type: Number,
            default: 0
        },
        district: {
            type: String,
            default: "Undefinded"
        },
        minAge: {
            type: Number,
            default: 0
        },
        availableDoses: {
            type: Number,
            default: 0
        },
        vaccineType: {
            type: String,
            default: "Undefinded"
        }
    }]
});

// Collection 

const tgramSlot = new mongoose.model('Slot', tgramSlotSchema);

module.exports = tgramSlot;