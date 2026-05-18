const cors = require("cors");
const cookieParser = require("cookie-parser");
const express = require("express");
const taskRoutes = require("./routes/task.routes");
const authRoutes = require("./routes/auth.routes");

const app = express();

app.use(cookieParser());

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true
  })
)
app.use(express.json());


app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);
app.get("/", (req, res) => {
    res.json({
        message: "TaskFlow API Running 🚀"
    });
});


module.exports = app;