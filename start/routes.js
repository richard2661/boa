const error = require("../middlewares/error");
const detail = require("../routes/detail");

module.exports = function (app) {
  app.use("/api/v1", detail);
  app.use(error);
};
