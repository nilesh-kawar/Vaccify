const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

// User Schema 
let userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    phone: {
        type: Number,
        required: true,
    },
    gender: {
        type: String,
        required: true,
    },
    age: {
        type: Number,
        required: true,
    },
    password: {
        type: String,
        required: true
    },
    cpassword: {
        type: String,
        required: true
    },
    appointmentBooked: {
        type: Boolean,
        default: false
    },
    appointment:[{
        session_id: {
            type: String,
        },
        date: {
            type: String,
        },
        vaccineName:{
            type: String,
            uppercase: true
        },
        vaccineType:{
            type: String,
        },
        minAge:{
            type: Number,
        },
    }],
    tokens:[{
        token:{
            type: String,
            required: true
        }
    }]
})

// Generating Tokens 
userSchema.methods.generateAuthToken = async function(req, res){
    try {
        const token = jwt.sign({_id:this._id.toString()}, process.env.SECRET_KEY);
        this.tokens = this.tokens.concat({token:token});
        await this.save();
        return token;
    } catch (err) { 
        res.send("Error: "+err);
        console.log("Error Occured: "+err);
    }
}

const User = mongoose.model('User', userSchema);

module.exports = User;