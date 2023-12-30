const express=require('express');
const bodyParser= require('body-parser');
const app=express();

const setupAndStartServer=()=>{
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended:true}))

    app.listen(3003,()=>{
        console.log("Server started on 3003");
    })
}

setupAndStartServer();