const express = require("express");
const app = express();

// import routes

const userRoutes = require("./routes/User");
const profileRoutes = require("./routes/Profile");
const paymentRoutes = require("./routes/Payment");
const courseRoutes = require("./routes/Course");

//  import more require packages
const cors = require("cors");
const cookieParser = require("cookie-parser");
const fileUpload = require("express-fileupload");

const { dataBaseConnect } = require("./config/database");
const dotenv = require("dotenv");
const {cloudinaryConnect } = require("./config/cloudinary");
dotenv.config();
const PORT = process.env.PORT || 5000;
// database connect
dataBaseConnect();
// middleware
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp",
  })
);
// cloudinary connection

cloudinaryConnect();

// mount routes

app.use("/api/v1/auth", userRoutes);
app.use("/api/v1/profile", profileRoutes);
app.use("/api/v1/course", courseRoutes);
app.use("/api/v1/payment", paymentRoutes);

// default route

app.get("/", (req, res) => {
  return res.json({
    success: true,
    message: "server is running",
  });
});

app.listen(PORT, () => {
  console.log(`App is running on port : ${PORT}`);
});
