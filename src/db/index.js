import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";

const connectDb = async () => {
  try {
    const connectionInstance = await mongoose.connect(
      `${process.env.MONGODB_URI}/${DB_NAME}`
    );

    console.log(
      `\n MongoDB Connected !! DB HOST: ${connectionInstance.connection.host}`
    );
  } catch (error) {
    console.error("MongoDB Connection Error:");
    console.error(error);
    process.exit(1);
  }
};

export default connectDb;
connectDb()
.then(() => {
  app.listen(process.env.PORT || 8000, () =>{
    console.log(`Server is running on the port: ${process.env.PORT || 8000}`);
  })
})

.catch((err) =>{
  console.log("Mongo db connection failed " , err);
})