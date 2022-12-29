const mongoose = require('mongoose')
const dotenv = require("dotenv").config()

mongoose.connect(process.env.MONGO_URI, {useNewUrlParser : true, useUnifiedTopology: true})

const connection = mongoose.connection

connection.on('error', err => console.log(err))
connection.on('connected', ()=> console.log('Mongo DB Connection successful'))
