import express from "express";
import dotenv from "dotenv";
import config from "./config";
import mongoose from "mongoose";
import bodyParser from "body-parser"

import userRoute from "./routes/userRoute";
import productRoute from "./routes/productRoute";
import orderRoute from "./routes/orderRoute"

dotenv.config();

const connectDB = async () => {
  const mongodbUrl = config.MONGODB_URL;
  try {
    const connect = await mongoose.connect(mongodbUrl, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
      useFindAndModify: false
    })
    console.log(`MongoDB connected ${mongodbUrl}`)
  } catch (err) {
    console.error(err)
    process.exit(1)
  }
}
connectDB()
const app = express();

app.use(bodyParser.json())
app.use('/api/users', userRoute);
app.use('/api/products', productRoute);
app.use('/api/orders', orderRoute);
// app.use('/uploads', express.static(path.join(__dirname, '/../uploads')));



app.listen(5000, () => {
  console.log(`server started at 5000`);
});
