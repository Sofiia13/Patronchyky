const express = require("express");
const app = express();
const bodyParser = require('body-parser');  
const mongoose = require("mongoose");
const port = 3001;

const authRouter = require("./backend/routes/authRoute");
const taskRouter = require("./backend/routes/tasksRoute");
const organizationRouter = require('./backend/routes/organizationRoute');

app.use(bodyParser.json());
app.use(express.json());
app.use("/auth", authRouter);
app.use("/tasks", taskRouter);
app.use("/organizations", organizationRouter);

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
