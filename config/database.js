import mongoose from "mongoose";
const connectToDatabase = async () => {
  try {
    const MonogoDB_URL = process.env.MONGODB_CONNECT_URL;
    const { connection } = await mongoose.connect(`${MonogoDB_URL}`, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });
    console.log(`Connected with the database: ${connection.host}`.cyan.bold);
  } catch (err) {
    console.error("Failed to connect with database".red.bold);
    console.error(`Error: ${err.message}`.red);
    process.exit(1);
  }
};

export default connectToDatabase;
