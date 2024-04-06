const express = require("express");
const cors = require("cors");
const app = express();
require("dotenv").config();
const dbConnect = require("./config/dbConnect");
const apiv1Router = require("./routes/index");
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());
app.use("/api/v1", apiv1Router);
app.get("/", (req, res) => {
  res.status(200).json({ message: "The backend is up and running" });
});

app.listen(PORT, () => console.log(`Backend is running @${PORT}`));
dbConnect();