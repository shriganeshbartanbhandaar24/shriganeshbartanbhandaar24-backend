import mongoose from "mongoose";
const connectToDatabase = async () => {
  try {
    const MonogoDB_URL = "";
    const { connection } = await mongoose.connect(MonogoDB_URL, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });
    console.log(`Connected to Database:${connection.host}`.cyan.bold);
  } catch (err) {
    console.error("Failed to connect with databse".red.bold);
    console.error(`Error:$(err.message)`.red);
    process.exit(1);
  }
};

export default connectToDatabase;
