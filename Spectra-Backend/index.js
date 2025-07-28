require('dotenv').config()

const express = require('express')
const connectDB = require('./config/db')
const cors = require('cors')
const authRoutes = require('./routes/auth-routes')
const userRoutes = require('./routes/user-routes')
const mongoose = require('mongoose')



connectDB()


const app = express()

app.use(cors({
  origin: "http://localhost:3000", // ✅ use your frontend origin explicitly
  credentials: true,               // ✅ allow credentials (cookies, auth headers)
}));

app.use(express.json())

mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});


app.use('/api/auth', authRoutes)
app.use('/api/users', userRoutes )

app.listen(4000, ()=>{
    console.log('Server is now running on port 4000'); 
})