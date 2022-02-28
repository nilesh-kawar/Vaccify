const express = require('express');
const dotenv = require('dotenv');
const bodyparser = require('body-parser');
const  cookieParser = require("cookie-parser");
const path = require('path');
const app = express();

const connectDB = require('./server/database/connection');
dotenv.config({path: 'config.env'});
const PORT = process.env.PORT || 8080;

// MongoDB Connection 
connectDB();
// Cookie Parser .
app.use(cookieParser());

// parse request to body parser 
app.use(bodyparser.urlencoded({extended: true}));

// set view engine..
app.set('view engine', 'ejs');

// load assets
app.use('/css',express.static(path.resolve(__dirname,"assets/css")));
app.use('/img',express.static(path.resolve(__dirname,"assets/img")));
app.use('/js',express.static(path.resolve(__dirname,"assets/js")));

// load routers
app.use('/', require('./server/routes/router'));

app.listen(PORT, (err)=>{
    console.log(`Server is running on http://localhost:${PORT}`);
})