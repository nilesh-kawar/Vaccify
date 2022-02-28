let Userdb = require('../model/userModel');
let Admindb = require('../model/adminModel');
let Hospitaldb = require('../model/hospitalModel');
let Slotdb = require('../model/slotModel');

// [+]
//Register new user
exports.register = async(req, res) => {
    try {
        //validate request
        if(!req.body){
            res.status(400).send({message: "Content cannot be empty!"});
            return;
        }
        password = req.body.password,
        cpassword = req.body.cpassword
        // New User 
        if(password === cpassword){
            const user = new Userdb({
                firstName : req.body.firstName,
                lastName : req.body.lastName,
                email : req.body.email,
                phone : req.body.phone, 
                gender : req.body.gender,
                age : req.body.age,
                password : req.body.password,
                cpassword : req.body.cpassword
            })
            // Token 
            const token = await user.generateAuthToken();
            console.log("User Register Token : "+token);
            // Cookies .
            res.cookie("userLogin",token,{
                expires: new Date(Date.now() + 24 * 60 * 60 * 1000), //expires in one day
                httpOnly: true
            })
            //save use in db
            await user
                .save(user)
                .then(data => {
                    // res.send(data);
                    res.redirect('/');
                    console.log('User Registered Successfully!!');
                })
                .catch((err)=>{
                    res.status(500).send({message: err.message || "Some error occured while creating a create operation"});
                });
        }else{
            res.send('Password and Confirm Password not match');
        }
    } catch (err) {
        res.status(400).send(err);
        console.log(err); 
    }
}
// Login User .
exports.login = async(req, res) =>{
    try {
        const email = req.body.email;
        const password = req.body.password;
        const user = await Userdb.findOne({email: email});
        // Check Passwords 
        if (user.password === password) {
            // Token
            const token = await user.generateAuthToken();
            // Cookies 
            res.cookie("userLogin",token,{
                expires: new Date(Date.now() + 24 * 60 * 60 * 1000), //expires in one day
                httpOnly: true,
            })
            res.redirect("/");
        }else{
            res.status(404).send("Password and email not match")
        }
    } catch (err) {
        res.status(400).send("Invalid Credentials");
        console.log(err);
    }
}
//Get All Users 
exports.getUsers = async(req,res) =>{
    if(req.query.id){
        const id = req.query.id;
        Userdb.findById(id)
            .then(data=>{
                if(!data){
                    res.status(404).send({message: "Not found user with id:",id})
                }else{
                    res.send(data);
                }
            })
            .catch(err=>{
                res.status(500).send({message:"Error retrieving user with id:",id});
            })
    }else{
        Userdb.find()
            .then(user=>{
                res.send(user);
            })
            .catch(err=>{
                res.status(500).send({message: err.message || "Error occured while retrieving user Information"});
            });
    }
}
// [+]
// Admin Register 
exports.adminRegister = async(req, res) => {
    try {
        //validate request
        if(!req.body){
            res.status(400).send({message: "Content cannot be empty!"});
            return;
        }
        password = req.body.password,
        cpassword = req.body.cpassword
        // New User 
        if(password === cpassword){
            const admin = new Admindb({
                email : req.body.email,
                password : req.body.password,
                cpassword : req.body.cpassword
            })
            // Token 
            const token = await admin.generateAuthToken();
            console.log("Admin Register Token : "+token);
            // Cookies .
            res.cookie("adminLogin",token,{
                expires: new Date(Date.now() + 24 * 60 * 60 * 1000), //expires in one day
                httpOnly: true
            })
            //save use in db
            await admin
                .save(admin)
                .then(data => {
                    // res.send(data);
                    res.redirect('/');
                    console.log('Admin Registered Successfully!!');
                })
                .catch((err)=>{
                    res.status(500).send({message: err.message || "Some error occured while creating a create operation"});
                });
        }else{
            res.send('Password and Confirm Password not match');
        }
    } catch (err) {
        res.status(400).send(err);
        console.log(err); 
    }
}
// Admin Login 
exports.adminLogin = async(req, res) =>{
    try {
        const email = req.body.email;
        const password = req.body.password;
        const admin = await Admindb.findOne({email: email});
        // Check Passwords 
        if (admin.password === password) {
            // Token
            const token = await admin.generateAuthToken();
            // console.log("User Login Token : "+token);
            // Cookies 
            res.cookie("adminLogin",token,{
                expires: new Date(Date.now() + 24 * 60 * 60 * 1000), //expires in one day
                httpOnly: true,
            })
            res.redirect("admin/dashboard");
        }else{
            res.status(404).send("Password and email not match")
        }
    } catch (err) {
        res.status(400).send("Invalid Credentials "+err);
        console.log(err);
    }
}

// [+]
// Hospital Register .
exports.hospitalRegister = async(req, res) => {
    try {
        //validate request
        if(!req.body){
            res.status(400).send({message: "Content cannot be empty!"});
            return;
        }
        password = req.body.password,
        cpassword = req.body.cpassword
        // New User 
        if(password === cpassword){
            const hospital = new Hospitaldb({
                hId : req.body.hspId,
                name : req.body.name,
                email : req.body.email,
                state : req.body.state,
                district : req.body.district,
                pincode : req.body.pincode,
                address : req.body.address,
                password : req.body.password,
                cpassword : req.body.cpassword
            })
            // Token 
            const token = await hospital.generateAuthToken();
            // console.log("Hospital Register Token : "+token);
            // Cookies .
            // res.cookie("hospitalLogin",token,{
            //     expires: new Date(Date.now() + 24 * 60 * 60 * 1000), //expires in one day
            //     httpOnly: true
            // })
            //save use in db
            await hospital
                .save(hospital)
                .then(data => {
                    // res.send(data);
                    res.redirect('/admin/add-hospital');
                    console.log('Hospital Registered Successfully!!');
                })
                .catch((err)=>{
                    res.status(500).send({message: err.message || "Some error occured while creating a create operation"});
                });
        }else{
            res.send('Password and Confirm Password not match');
        }
    } catch (err) {
        res.status(400).send(err);
        console.log(err); 
    }
}
// Hospital Login 
exports.hospitalLogin = async(req, res) =>{
    try {
        const email = req.body.email;
        const password = req.body.password;
        
        const hospital = await Hospitaldb.findOne({email: email});
        // Check Passwords 
        if (hospital.password === password) {
             // Token
            const token = await hospital.generateAuthToken();
            // console.log("User Login Token : "+token);
            // Cookies 
            res.cookie("hospitalLogin",token,{
                expires: new Date(Date.now() + 24 * 60 * 60 * 1000), //expires in one day
                httpOnly: true,
            })
            res.redirect("hospital/dashboard");
        }else{
            res.status(404).send("Password and email not match")
        }
    } catch (err) {
        res.status(400).send("Invalid Credentials "+err);
        console.log(err);
    }
}
//Get all hospitals
exports.allHospitals = async(req,res) =>{
    if(req.query.id){
        const id = req.query.id;
        Hospitaldb.findById(id)
            .then(data=>{
                if(!data){
                    res.status(404).send({message: "Not found user with id:",id})
                }else{
                    res.send(data);
                }
            })
            .catch(err=>{
                res.status(500).send({message:"Error retrieving user with id:",id});
            })
    }else{
        Hospitaldb.find()
            .then(hospital=>{
                res.send(hospital);
            })
            .catch(err=>{
                res.status(500).send({message: err.message || "Error occured while retrieving hospital Information"});
            });
    }
}
// Update Hospital 
exports.updateHospital = async(req,res) =>{
    if(!req.body){
        return res.status(400).send({message: "Data to update cannot be empty"});
    }
    const id = req.params.id;
    console.log(id);
    Hospitaldb.findByIdAndUpdate(id, req.body,{useFindAndModify: false})
        .then(data=>{
            if(!data){
                res.status(404).send({message:`Cannot update user with ${id}. Maybe Hospital not found`})
            }else{
                res.send(data);
            }
        })
        .catch(err=>{
            res.status(500).send({message: 'Error Update Hospital information'});
        })
}

// [-]
// Add Slots 
exports.addSlots = async(req, res) => {
    try {
        //validate request
        if(!req.body){
            res.status(400).send({message: "Content cannot be empty!"});
            return;
        }
        console.log(req.body.date);
        // New User 
        const session = new Slotdb({
            hId : req.body.hspId,
            name : req.body.name,
            email : req.body.email,
            state : req.body.state,
            district : req.body.district,
            pincode : req.body.pincode,
            address : req.body.address,
            sessions:[{
                session_id: req.body.sesion_id,
                date: req.body.date,
                vaccineName: req.body.vaccineName,
                vaccineType: req.body.vaccineType,
                minAge: req.body.minAge,
                availableDoses: req.body.availableDoses
            }]
        })
        //save use in db
        await session
            .save(session)
            .then(data => {
                // res.send(data);
                res.redirect('/hospital/add-slot');
                console.log('Slot Registered Successfully!!');
            })
            .catch((err)=>{
                res.status(500).send({message: err.message || "Some error occured while creating a create operation"});
            });
    } catch (err) {
        res.status(400).send(err);
        console.log(err); 
    }
}
//Get SLots 
exports.getSlots = async(req,res) =>{
    if(req.query.id){
        const id = req.query.id;
        Slotdb.find({hId: id})
            .then(data=>{
                if(!data){
                    res.status(404).send({message: "Not found user with id:",id})
                }else{
                    res.send(data);
                }
            })
            .catch(err=>{
                res.status(500).send({message:"Error retrieving user with id:",id});
            })
    }else if(req.query.district){
        const district = req.query.district;
        console.log(district);
        Slotdb.find({district: district})
            .then(data=>{
                if(!data){
                    res.status(404).send({message: "Not found user with id:",id})
                }else{
                    res.send(data);
                }
            })
            .catch(err=>{
                res.status(500).send({message:"Error retrieving user with id:",id});
            })
    }else if(req.query.session_id){
        const id = req.query.session_id;
        Slotdb.findById(id)
        .then(data=>{
            if(!data){
                res.status(404).send({message: "Not found user with id:",id})
            }else{
                res.send(data);
            }
        })
        .catch(err=>{
            res.status(500).send({message:"Error retrieving user with id:",id});
        })

    }else{
        Slotdb.find()
            .then(slots=>{
                res.send(slots);
            })
            .catch(err=>{
                res.status(500).send({message: err.message || "Error occured while retrieving slots Information"});
            });
    }
}
