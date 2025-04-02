import mongoose from "mongoose";

const url = "mongodb+srv://denis:FGIgxSiUaJKpOQI4@ddb.oljshlt.mongodb.net/GamesApi?retryWrites=true&w=majority&appName=DDB"
const connection = async () => {
    try {
        const conn = await mongoose.connect(url)
        console.log("conected to db")
    } catch (error) {
        console.error(error)
    }
}

export default connection;