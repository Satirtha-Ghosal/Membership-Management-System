const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const memberRouter = require('./routes/member.route.js')
const planRouter = require('./routes/plan.route.js')
require('dotenv').config();

const PW = process.env.API_KEY;


const app = express();
app.use(express.json())

app.use(cors({
    origin: "http://localhost:5173", // Allow requests from your frontend
    methods: "GET,POST,PUT,DELETE",
    allowedHeaders: "Content-Type,Authorization"
}));

app.get('/',((req,res) => {
    res.send("Hello World")
}))

app.use('/api/members', memberRouter)
app.use('/api/plans', planRouter)

app.listen(3000, ()=>{
    console.log("Listening at port 3000...")
})

mongoose.connect(`mongodb+srv://ghosalsatirtha:${PW}@members.iexzs.mongodb.net/?retryWrites=true&w=majority&appName=Members`)
.then(()=>{
    console.log("Connected to members db")
})
.catch(()=>{
    console.log("Error")
})