const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

// User Schema 
let adminSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
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
adminSchema.methods.generateAuthToken = async function(req, res){
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
const Admin = mongoose.model('Admin', adminSchema);

module.exports = Admin;