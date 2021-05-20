const express = require("express");
const colors = require("colors");
const dotenv = require("dotenv");

const bootcamps = require("./routes/bootcamps");
const courses = require("./routes/courses");
const connectDB = require("./config/db");

const ErrorHandler = require("./middleware/Error");

// const { logger } = require("./middleware/logger");

const morgan = require("morgan");
// Load env variables
connectDB();

dotenv.config({ path: "./config/config.env" });

const PORT = process.env.PORT || 3001;

const app = express();

// Body parser
app.use(express.json());
// if (process.env.NODE_ENV === "development") {
//   app.use(morgan("dev"));
// }

app.use("/api/v1/bootcamps", bootcamps);
app.use("/api/v1/courses", courses);
app.use(ErrorHandler);
app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`.yellow.bold);
});

// Handle unhandledd rejection with a new function

process.on("unhandledRejection", (err, promise) => {
  console.log(`Error : ${err.message}`.red.bold);
  // CLose the server and exit process
  server.close(() => process.exit(1));
});
