import mongoose from "mongoose"

export const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGODB_URI);
        console.log(`Mongo DB is connected successfully! ${conn.connection.host}`);
    } catch (error) {
        console.log(`Error in connecting Database : ${error.message}`);
        process.exit(1);
    }
}