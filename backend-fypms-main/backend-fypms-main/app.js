const express = require("express");
require("dotenv").config({ path: ".env" });
const cors = require("cors");

const corsOptions = {
  origin: "*",
  optionsSuccessStatus: 200,
  methods: "GET,PUT,PATCH,POST,DELETE",
};

const connectDB = require("./config/db");

const PORT = process.env.PORT || 8000;

const authRoutes = require("./routes/authRoutes");
const adminRoutes = require("./routes/adminRoutes");
const studentRoutes = require("./routes/studentRoutes");
const teacherRoutes = require("./routes/teacherRoutes");
const studentGradeRoutes = require("./routes/studentGradeRoutes");
const scheduleRoutes = require('./routes/scheduleRoutes.js');
const gradeRoutes = require('./routes/gradeRoutes'); // Ensure this path is correct

const HttpError = require("./models/HttpError");
const app = express();
app.use(express.json());

app.use(cors(corsOptions));
connectDB();

app.use("/api/", authRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/student", studentRoutes);
app.use("/api/teacher", teacherRoutes);
app.use('/api/student-grades', studentGradeRoutes);
app.use('/api', scheduleRoutes);
app.use('/api/grades', gradeRoutes);

app.use("/", (req, res) => {
  res.send("server working");
});

app.use((req, res, next) => {
  const error = new HttpError("Could not find this route.", 404);
  throw error;
});

app.use((error, req, res, next) => {
  if (res.headerSent) {
    return next(error);
  }
  res.status(error.code || 500);
  res.json({ message: error.message || "An unknown error occurred!" });
});

app.listen(PORT, () => {
  console.log(`server started on port ${PORT}`);
});
