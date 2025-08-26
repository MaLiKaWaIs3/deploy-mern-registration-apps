const express  = require('express');
const app =express();
const bodyParser = require ('body-parser');
const cors =require ('cors');
const AuthRouter = require('./Routes/authRouter');
const ProductRouter = require('./Routes/ProductRouter');
require('dotenv').config();
require('./Models/db');

const PORT = process.env.PORT || 8080;
app.get('/ping',(req,res)=>{
    res.send('PONG');

});
//it is necessary to add middleware 
app.use(bodyParser.json());
//cors library//what ever you want to allow request for localhost port 8080 or3000 what every where
app.use(cors())
//router
app.use('/auth',AuthRouter);
app.use('/products',ProductRouter);

app.listen(PORT,()=>{
    console.log(`server is running on ${PORT}`)
})