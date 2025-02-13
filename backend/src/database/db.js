import mongoose from "mongoose";

const connectDB = async () => {
    try {
        const connectedBD = await mongoose.connect(`${process.env.MONGODB_URL}`)
        // console.log(connectedBD)
    }
    catch(err) {
        console.log(`MongoDB connection Fail: ${err}`)
        process.exit(1)
    }
}

export default connectDB