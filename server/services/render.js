const { v4: uuidv4 } = require('uuid');
const axios = require('axios');

//[+] User Routes:
exports.homeRoutes = (req, res) => {
    res.render('index',{ title: 'Homepage', req: req});
}
exports.login = (req, res) =>{
    res.render('login', { title: 'Login' });
}
exports.register = async(req, res) =>{
    res.render("register");
}
exports.logout = async(req, res) =>{
    try {
        // For Single Logout 
        // req.user.tokens = req.user.tokens. filter((currentElem)=>{
        //     return currentElem.token !== req.token;
        // })
        // Logout from all devices 
        req.user.tokens = [];

        res.clearCookie("userLogin");
        console.log("Logout Successfully!!");
        await req.user.save();
        res.redirect("login");
    } catch (err) {
        res.status(500).send(err)
    }
}
exports.user = async(req, res) =>{
    try {
        // Make a get request to /api/users  
        axios.get(`${process.env.HOST}/api/slots`,{params: {district: req.query.district}})
        .then(slotData => {
            res.render('user', { 
                title: 'Book Vaccine',
                page_name: 'total-slots',
                slot: slotData.data,
                req: req
            });
        })
    } catch (err) {
        res.send(err);
    }
}
exports.slotBooked = async(req, res) =>{
    try {
        axios.get(`${process.env.HOST}/api/slots`,{
            params: {
                session_id: req.query.session_id
            }
        })
        .then(slotData => {
            // console.log(slotData.data);
            res.render('user', { 
                title: 'Book Vaccine',
                page_name: 'total-slots',
                slot: slotData.data,
                req: req
            });
        })

        res.render('slot-booked',{ 
            title: 'Slot Booked Successfully!!', 
            req: req
        });
    } catch (err) {
        res.send(err);
    }
}

// ---------------------------------------------------------------------------------------
//[+] Admin 
exports.admin_login = (req, res) => {
    res.render('admin-login');
}
exports.admin_register = (req, res) => {
    res.render('admin-register');
}
exports.admin_logout = async(req, res) =>{
    try {
        // For Single Logout 
        // req.user.tokens = req.user.tokens. filter((currentElem)=>{
        //     return currentElem.token !== req.token;
        // })
        // console.log(req.admin);
        // Logout from all devices 
        req.admin.tokens = [];

        res.clearCookie("adminLogin");
        console.log("Admin Logout Successfully!!");
        await req.admin.save();
        res.redirect("/");
    } catch (err) {
        res.status(500).send(err)
    }
}
// ---------------------------------------------------------------------------------------
// [+]Hospital 
exports.hospitalRegister = (req, res) =>{
    res.render('admin/add-hospital', { 
        title: 'Admin- Add Hospital', 
        page_name: 'add-hospital' ,
        hospital_id: uuidv4()
    });
}
exports.hospital_login = (req, res) => {
    res.render('hospital-login');
}
exports.hospital_logout = async(req, res) =>{
    try {
        // For Single Logout 
        // req.user.tokens = req.user.tokens. filter((currentElem)=>{
        //     return currentElem.token !== req.token;
        // })
        // console.log(req.admin);
        // Logout from all devices 
        req.hospital.tokens = [];

        res.clearCookie("hospitalLogin");
        console.log("Hospital Logout Successfully!!");
        await req.hospital.save();
        res.redirect("/");
    } catch (err) {
        res.status(500).send(err)
    }
}
// ---------------------------------------------------------------------------------------
// [+] Admin Dashboard 
exports.adminDashboard = async(req, res) =>{
    const totalUsers = async() => {
        let res = await axios.get(`${process.env.HOST}/api/users`)
        return res.data.length;
    }
    const totalHospitals = async() => {
        let res = await axios.get(`${process.env.HOST}/api/hospital`)
        return res.data.length;
    }
    
    res.render('admin/dashboard', { 
        title: 'Admin- Dashboard', 
        page_name: 'admin-dashboard',
        totalUsers: await totalUsers(),
        totalHospitals: await totalHospitals()
    });
}
exports.all_hospitals = (req, res) =>{
    // Make a get request to /api/users  
    axios.get(`${process.env.HOST}/api/hospital`)
    .then(response => {
        res.render('admin/all-hospitals', { 
            title: 'Admin- All Hospitals' ,
            page_name: 'all-hospitals',
            hospital: response.data
        });
    })
}
exports.edit_hospital = (req, res) =>{ 
    // Make a get request to /api/users  
    axios.get(`${process.env.HOST}/api/hospital`,{params: {id: req.query.id}})
    .then(hospitalData => {
        res.render('admin/edit-hospital', { 
            title: 'Admin- Edit Hospitals' ,
            page_name: 'edit-hospital',
            hospital_id: uuidv4(),
            hospital: hospitalData.data
        });
    })
}
exports.all_users = (req, res) =>{
    // Make a get request to /api/users  
    axios.get(`${process.env.HOST}/api/users`)
    .then(response => {
        res.render('admin/all-users', { 
            title: 'Admin- All -Users' ,
            page_name: 'all-users',
            user: response.data
        });
    })
}
exports.all_slots = (req, res) =>{
    // Make a get request to /api/users  
    axios.get(`${process.env.HOST}/api/slots`)
    .then(response => {
        res.render('admin/all-slots', { 
            title: 'Admin- All -Slots' ,
            page_name: 'all-slots',
            slot: response.data
        });
    })
} 
// ---------------------------------------------------------------------------------------
//[-] Hospital 
exports.hospitalDashboard = (req, res) =>{
    res.render('hospital/dashboard', { 
        title: 'Hospital - Dashboard',
        page_name: 'hospital-dashboard',
        req: req
    });
}
exports.add_slot = (req, res) =>{
    res.render('hospital/add-slot', { 
        title: 'Hospital - Add Slot',
        page_name: 'add-slot',
        req: req,
        session_id: uuidv4(),
    });
}
exports.total_slots = (req, res) =>{
    // Make a get request to /api/users  
    axios.get(`${process.env.HOST}/api/slots`,{params: {id: req.query.id}})
    .then(slotData => {
        res.render('hospital/total-slots', { 
            title: 'Hospital - Total Slot',
            page_name: 'total-slots',
            slot: slotData.data,
            req: req
        });
    })
}
exports.slot_detail = (req, res) =>{
    res.render('hospital/slot-detail', { 
        title: 'Hospital - Slot Detail',
        page_name: 'slot-detail' 
    });
}


