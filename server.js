'use strict';
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const assingRoutes = require('./routes/server');
const dotenv = require('dotenv');
const morgan = require('morgan');
const device = require('express-device');

dotenv.config();
  
const app = express();
const ENVIRONMET = process.env.NODE_ENVIRONMENT;
const PORT = process.env.PORT || 4000;


//middleware setup

const assignMiddlewaer=(app)=>{
    app.use(morgan('dev'));
    app.use(cors());
    app.use(device.capture());
    app.use(bodyParser.json({limit:'999mb', parameterlimit:1000000}));
    app.use(bodyParser.urlencoded({limit:'999mb', extended:true, parameterLimit:1000000}));
    app.disable('etag');
    app.disable('automatic 304s');
    app.use(passport.initialize());
}

//route assigment
const assigmentRoute=(app)=>{
    app.use(device.capture());
    app.use('/',express.static('static'));
    assingRoutes(app)
};

//success handler
const successHanler = (req, res)=>{
    res.statusCode =200;
    res.json({status:'Success',message:'parcel pending API',dta:{}})
}

// Error Handler
const errorHandler =(req, res, next)=>{
    const err = new Error('Not Found');
    err.status=400;
    next(err);
};

// start the server
const startServer = ()=>{
    assignMiddlewaer(app);
    assigmentRoute(app);
    app.use(successHanler);
    app.use(errorHandler);

    app.listen(PORT,()=>{
        console.info(`Sever started on port ${PORT}`);
    }).on('error',(err)=>{
        console.log(err)
    });
};

startServer()