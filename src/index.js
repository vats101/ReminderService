const express=require('express');
const bodyParser= require('body-parser');
const app=express();
const {PORT} = require('./config/serverConfig')
const {sendBasicEmail}=require('./services/email-service')
const setupAndStartServer=()=>{
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended:true}))
    app.listen(PORT,()=>{
        console.log(`Server started on ${PORT}`);
        //sendBasicEmail('support@admin.com','shriyamehta186@gmail.com','Mai Tumse Pyaar krta hu.','Kab milna chahogi')
    })
}

setupAndStartServer();