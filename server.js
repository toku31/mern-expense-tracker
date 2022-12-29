const express = require('express')
const dbconnect = require('./dbConnect')
const dotenv = require("dotenv").config()
const port = process.env.PORT || 5000;
const app = express();
app.use(express.json())
const userRoute = require('./routes/userRoute')
const transactionRoute = require('./routes/transactionsRoute')

app.use('/api/users/', userRoute)
app.use('/api/transactions/', transactionRoute)

if (process.env.NODE_ENV === 'production'){
  app.use('/', express.static('client/build'))
  app.get('*', (req, res)=> {
    res.sendFile(path.resolve(__dirname, 'client/build/index.html'))
  })
}

// app.get('/', (req, res) => res.send('Hello World'))
app.listen(port, ()=> console.log(`Node JS Server started at port ${port}!`))




// app.use(morgan("dev"))
// app.use(express.json({limit: "30mb", extended: true}))
// app.use(express.urlencoded({limit: "30mb", extended: true}))
// app.use(cors())

// const MONGODB_URL ="mongodb+srv://<username>:<password>@cluster0.7eiib.mongodb.net/news_db?retryWrites=true&w=majority"
// mongodb+srv://expense-tracker-user :test1234@cluster0.7eiib.mongodb.net/news_db?retryWrites=true&w=majority

// mongoose.connect(MONGODB_URL).then(() => {
//   app.listen(port, () => 
//     console.log(`Server running on port ${port}`)
//   )
// }).catch((error) => console.log(`${error} did not connect`))