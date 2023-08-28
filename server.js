const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv");
const pool = require("./db/index");
const sequelize = require("./db/sequlize");
const authRoutes = require("./routes/auth-routes");
const userRoute = require("./routes/user-route");
const bodyParser = require("body-parser");
const db = require("./models");
const errorHandler = require("./middleware/errorHandle");

dotenv.config();
const app = express();
app.use(bodyParser.json());
const corsOption = { credentials: true, origin: process.env.URL || "*" };

app.use(cors(corsOption));
app.use(express.json());
app.use(cookieParser());
app.use(errorHandler);

app.use("/auth", authRoutes);
app.use('/user', userRoute);

const PORT = process.env.PORT || 8000;

db.sequelize.sync().then(() => {
  // console.log('Drop and Resync Db');
  console.log("DATABASE CONNECTED , Drop and Resync Db");

});
db.sequelize
  .authenticate()
  .then(() => {
    console.log("Connection has been established successfully.");
  })
  .catch((err) => {
    console.log("Error occured in connection" + err);
  });
// Load routes and middleware here

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

app.get("/", (req, res) => {
 
  res.send("Hello World");

});