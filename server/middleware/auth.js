const jwt = require("jsonwebtoken");
const Userdb = require("../model/userModel");
const Admindb = require('../model/adminModel');
const Hospitaldb = require('../model/hospitalModel');

// User Authentication 
exports.userAuth = async(req, res, next) =>{
    try {
        const token = req.cookies.userLogin;
        const verifyUser = jwt.verify(token, process.env.SECRET_KEY);
        // console.log(verifyUser);

        const user  = await Userdb.findOne({_id:verifyUser._id})
        console.log("User Logged In: "+user.firstName);

        req.token = token;
        req.user = user;

        next();
    } catch (err) {
        // res.status(401).send("Session Expired pls login again! "+err);
        console.log("Session Expired pls login again! ");
        res.redirect("/login");
    }
}
// Admin Authentication 
exports.adminAuth = async(req, res, next) =>{
    try {
        const token = req.cookies.adminLogin;
        const verifyAdmin = jwt.verify(token, process.env.SECRET_KEY);
        // console.log(verifyAdmin);

        const admin  = await Admindb.findOne({_id:verifyAdmin._id})
        console.log("admin Logged In: "+admin.email);

        req.token = token;
        req.admin = admin;

        next();
    } catch (err) {
        // res.status(401).send("Session Expired pls login again! "+err);
        console.log("Session Expired pls login again! ");
        res.redirect("/admin-login");
    }
}
// Hospital Authentication 
exports.hospitalAuth = async(req, res, next) =>{
    try {
        const token = req.cookies.hospitalLogin;
        const verifyHospital = jwt.verify(token, process.env.SECRET_KEY);
        // console.log(verifyHospital);

        const hospital  = await Hospitaldb.findOne({_id:verifyHospital._id})
        // console.log("Hospital Logged In: "+hospital.name);

        req.token = token;
        req.hospital = hospital;

        next();
    } catch (err) {
        // res.status(401).send("Session Expired pls login again! "+err);
        console.log("Session Expired pls login again! ");
        res.redirect("/hospital-login");
    }
}