const express = require("express");
const cors = require("cors");
const {connection} = require("./config/db");
const {userRouter} = require("./routes/user.routes");
const {docRouter} = require('./routes/docs.routes');
require("dotenv").config();

const app = express();

app.use(express.json());
app.use(cors());
app.use("/users", userRouter);
app.use("/docs", docRouter);


app.get('/',(req,res) =>{
    res.send({
        msg:"This is the home route"
    })
})


app.listen(process.env.PORT, async()=>{
    try {
        await connection;
        console.log(`Connected with Database`);
        console.log(`Server is running on port : ${process.env.PORT}`);
    } catch (error) {
        console.log(`Error occured : ${error}`);
    }
})