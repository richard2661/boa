const winston = require("winston");
const http = require("http");
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const dotenv = require("dotenv");
const path = require("path");

if (process.env.NODE_ENV !== "production") {
  dotenv.config();
}

const app = express();
app.disable("x-powered-by");
app.set("trust proxy", "loopback");
app.use(
  cors({
    methods: ["GET", "POST", "DELETE", "PUT"],
    origin: "*",
  }),
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "client/build")));

if (process.env.DB_URI) require("./connection/connection");

require("./start/logging")();
require("./start/routes")(app);
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "client/build/index.html"));
});

const logger = morgan("dev");
const server = http.createServer(app);

server.on("request", (req, res) => {
  logger(req, res, (err) => {
    if (err) {
      winston.error(`Morgan Error: ${err}`);
    }
  });
});

server.listen(process.env.PORT, () =>
  winston.info(
    `\x1b[42m🚀 Server is running on port:${process.env.PORT}\x1b[0m`,
  ),
);
