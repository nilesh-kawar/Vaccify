const mongoose = require('mongoose');
// const jwt = require('jsonwebtoken');

// User Schema 
let slotSchema = new mongoose.Schema({
    hId: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    state: {
        type: String,
        required: true,
    },
    district: {
        type: String,
        required: true,
    },
    pincode: {
        type: Number,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    sessions:[{
        session_id: {
            type: String,
            required: true,
        },
        date: {
            type: String,
            required: true,
        },
        vaccineName:{
            type: String,
            required: true,
            uppercase: true
        },
        vaccineType:{
            type: String,
            required: true,
        },
        minAge:{
            type: Number,
            required: true
        },
        availableDoses:{
            type: Number,
            required: true
        }
    }],
})

// Generating Tokens 
// slotSchema.methods.generateAuthToken = async function(req, res){
//     try {
//         const token = jwt.sign({_id:this._id.toString()}, process.env.SECRET_KEY);
//         this.tokens = this.tokens.concat({token:token});
//         await this.save();
//         return token;
//     } catch (err) { 
//         res.send("Error: "+err);
//         console.log("Error Occured: "+err);
//     }
// }

const Slot = mongoose.model('Slot', slotSchema);

module.exports = Slot;