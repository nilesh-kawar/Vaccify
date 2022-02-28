const express = require('express');
const route = express.Router();

const auth = require("../middleware/auth");
const services = require('../services/render');
const controller = require('../controller/controller');


//[+] User:
route.get('/', services.homeRoutes);
route.get('/login',services.login);
route.get('/register',services.register);
route.get('/logout',auth.userAuth,services.logout);
route.get('/user',auth.userAuth,services.user);
route.get('/slot-booked',auth.userAuth,services.slotBooked);
//[+] Admin 
route.get('/admin-login',services.admin_login);
route.get('/admin-register',services.admin_register);
route.get('/admin-logout',auth.adminAuth,services.admin_logout);
//[+]Hospital 
route.get('/admin/add-hospital',auth.adminAuth,services.hospitalRegister);
route.get('/hospital-login',services.hospital_login);
route.get('/hospital-logout',auth.hospitalAuth,services.hospital_logout);

//[+] Admin Dashboard 
route.get('/admin/dashboard',auth.adminAuth, services.adminDashboard);
route.get('/admin/all-hospitals',auth.adminAuth,services.all_hospitals);
route.get('/admin/edit-hospital',auth.adminAuth,services.edit_hospital);
route.get('/admin/all-users',auth.adminAuth,services.all_users);
route.get('/admin/all-slots',auth.adminAuth,services.all_slots);
// [+]Hospital 
route.get('/hospital/dashboard',auth.hospitalAuth,services.hospitalDashboard)
route.get('/hospital/add-slot',auth.hospitalAuth,services.add_slot)
route.get('/hospital/total-slots',auth.hospitalAuth,services.total_slots)
route.get('/hospital/slot-detail',auth.hospitalAuth,services.slot_detail)

// ----------------------------------------------------------------------
// [+]Login 
route.post('/login', controller.login);
route.post('/adminLogin', controller.adminLogin);
route.post('/hospitalLogin', controller.hospitalLogin);
// ----------------------------------------------------------------------

//[+] User API 
route.post('/api/users', controller.register);
route.get('/api/users', controller.getUsers);
//[+] Admin API 
route.post('/api/admin', controller.adminRegister);
route.put('/api/hospital/:id', controller.updateHospital);
//[+] Hospital API 
route.post('/api/hospital', controller.hospitalRegister);
route.get('/api/hospital', controller.allHospitals);

// Slots API 
route.post('/api/slots', controller.addSlots);
route.get('/api/slots', controller.getSlots);
route.get('/api/slots/:id', controller.getSlots);
route.get('/api/slots/:district', controller.getSlots);
route.get('/api/slots/:session_id/:user_id', controller.getSlots);

module.exports = route;
