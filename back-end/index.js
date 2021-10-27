require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const db = require("./helpers/dbConnetion");
const data = require("./data");
const path = require('path');
const userRouter = require("./routers/userRouter");
const productRouter = require("./routers/productRouter");
const orderRouter = require("./routers/orderRouter");
const uploadRouter = require('./helpers/multer') ;
const app = express();

db.connectDB();
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use("/", express.static(path.join(__dirname, "/images")));
// app.get("/api/products", (req, res) => {
//   res.send(data.products);
// });
// app.use(express.static("public"));

app.use('/api/uploads', uploadRouter);
app.use("/api/users", userRouter);
app.use("/api/products", productRouter);
app.use("/api/orders", orderRouter);
app.use('/api/config/paypal',(req,res)=>{
  res.send(process.env.PAYPAL_CLIENT_ID || "sb")
})
// app.get('*', (req, res) =>
//   res.sendFile(path.join(__dirname, '/frontend/build/index.html'))
// );
app.get("/", (req, res) => {
  res.send("Server is ready");
});
app.use((err, req, res, next) => {
  res.status(500).json({ message: err });
});

const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log(`serve at http://localhost:${port}`);
});
