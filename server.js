const express = require('express');
const app = express();
const connectDb = require('./config/dbConnection')
const errorHandler = require('./middleware/errorhandler')
const dotenv = require("dotenv").config()
const port = process.env.PORT || 5000;

// app.get("/api/contacts/",(req,res)=>{
//     // res.json({msg:" get all contacts"})
//     // res.send("all contacts");
    
// });
connectDb();

app.use(express.json())
app.use('/api/contacts', require('./routes/contactRoutes'));
app.use('/api/users', require('./routes/userRoutes'));
app.use(errorHandler);

app.listen(port, ()=>{
    console.log(`server running on ${port}`);
})