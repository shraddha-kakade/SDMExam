const express = require('express');
const bookRelatedRoutes = require('./routes/book');

const app = express();

app.use((request,response,next)=>{
    response.setHeader('Access-Control-Allow-Origin',"*");
    response.setHeader('Access-Control-Allow-Headers',"*");
    response.setHeader('Access-Control-Allow-Methods',"*");
    next();
});

app.use(express.json());

app.use('/',bookRelatedRoutes);

app.listen(4000,()=>{console.log("Server started at 4000")});