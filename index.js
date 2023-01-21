require("dotenv").config();
const express = require("express");
const cors = require("cors");
const dbConnection = require("./config/db");
const app = express();
const PORT = 8086;
app.use(express.json());
app.use(cors());
// ================================ROUTES=========================
const userRoute = require("./user/userRoute");
app.get("/",(req,res)=>{
  res.send("From Home")
})
app.use("/", userRoute);
dbConnection();
app.listen(PORT, () => {
  console.log("server runnig on http://localhost:8086");
});
