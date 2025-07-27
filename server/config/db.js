const mongoose = require('mongoose')

const connectDB = async ()=>{
    try {
        await mongoose.connect(process.env.MONGO_URL)
        console.log('Database connected successfully')
    } catch (error) {
        console.error('Something went wrong');
        process.exit(1)
    }
}


module.exports = connectDB