require("dotenv").config();
require("express-async-errors");
const express = require("express");
const app = express();
const connectDB = require("./db/connect");
const productRouter = require("./routes/productRouter");
const errorHandlerMiddleware = require("./middlewares/error-handler");
const notFound = require("./middlewares/notFound");
//middlewares
app.use(express.json());
app.use("/api/v1/products", productRouter);

//routes
app.get("/", (req, res) => {
  res.status(200).send("hello");
});
app.use(notFound);
app.use(errorHandlerMiddleware);
//database
const PORT = process.env.PORT || 4000;
const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(PORT, () =>
      console.log(`Server running on ${PORT} successfully...`)
    );
  } catch (err) {
    console.log(err);
  }
};
start();
