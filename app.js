const express = require("express");
const app = express();
const mongoose = require("mongoose");
const port = 3001;

const authRouter = require("./backend/routes/authRoute");

app.use(express.json());

app.use("/auth", authRouter);

app.listen(port, async () => {
  mongoose.set("strictQuery", false);
  try {
    await mongoose.connect(
      "mongodb+srv://rpeleh19:roias8pTo0R3YjVy@codeconclaster.32a08ia.mongodb.net/"
    );
    console.log(`Сервер запущено на порті ${port}`);
  } catch (error) {
    console.error("connection error:", error);
  }
});
