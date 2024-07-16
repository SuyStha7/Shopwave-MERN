import mongoose from 'mongoose'
import colors from 'colors'

const connectDB = async ()=>{
    try {
        const conn = await mongoose.connect(`${process.env.MONGO_URL}`)
        console.log(`Connected to MongoDB ${conn.connection.host}`.bgBlue)
    } catch (error) {
        console.log(`MongoDB connection error - ${error}`)
    }
}

export default connectDB
