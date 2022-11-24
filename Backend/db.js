import mongoose from "mongoose";
const connectDB = async () => {
  const res = await mongoose.connect(
    `mongodb+srv://${process.env.USERNAME}:${process.env.PASSWORD}@cluster0.ewpe4.mongodb.net/darwich?retryWrites=true&w=majority`
  );

  console.log("connection to database is successfull");
};
export default connectDB;
