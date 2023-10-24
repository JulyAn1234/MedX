import mongoose from 'mongoose';
const {MONGODB_URI} = process.env;
const MONGODB_CONNECTED_VALUE = 1;

if (!MONGODB_URI){
    throw new Error ("MONGO_URI must be defined");
}

export const connectToMongodb = async () => {
    try {
        const {connection} = await mongoose.connect(MONGODB_URI);
        if (connection.readyState === MONGODB_CONNECTED_VALUE){
            console.log("MongoDB connected");
            return Promise.resolve(true);
        }
    }catch (error) {
        console.log(error);
        return Promise.reject(false);
    }
}