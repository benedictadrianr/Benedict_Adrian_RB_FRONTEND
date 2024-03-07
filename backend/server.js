require("dotenv").config();

const mongoose = require("mongoose");
const express = require("express");
const userRoutes = require("./routes/user");
const cors = require("cors");

const app = express();

app.use(cors({ origin: "http://localhost:5173", credentials: true }));

app.use(express.json());

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

app.use("/api/users", userRoutes);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(`Connected to DB and Listening on Port: ${process.env.PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
