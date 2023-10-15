const express = require('express')
const mongoose = require('mongoose')
const app = express()
const userRoutes = require("./routes/userRoutes")
const employeeRoutes = require("./routes/employeeRoutes")


const SERVER_PORT = 3002

app.use(express.json())

app.use(express.urlencoded())
const DB_CONNECTION_STRING =  "mongodb+srv://dbUser:dbPassword@cluster0.ujphzpd.mongodb.net/comp3123_assignment1?retryWrites=true&w=majority"

mongoose.connect(DB_CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
app.use('/api/v1/user', userRoutes);
app.use('/api/v1/emp', employeeRoutes);

app.listen(SERVER_PORT, () =>{
    console.log(`Server running at http://localhost:${SERVER_PORT}/`)
})