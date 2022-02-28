const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

// User Schema 
let hospitalSchema = new mongoose.Schema({
    hId: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
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
    password: {
        type: String,
        required: true
    },
    cpassword: {
        type: String,
        required: true
    },
    tokens:[{
        token:{
            type: String,
            required: true
        }
    }]
})

// Generating Tokens 
hospitalSchema.methods.generateAuthToken = async function(req, res){
    try {
        const token = jwt.sign({_id:this._id.toString()}, process.env.SECRET_KEY);
        this.tokens = this.tokens.concat({token:token});
        await this.save();
        return token;
    } catch (err) { 
        // res.send("Error: "+err);
        console.log("Error Occured: "+err);
    }
}

const Hospital = mongoose.model('Hospital', hospitalSchema);

module.exports = Hospital;