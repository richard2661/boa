const router = require("express").Router();
const { DetailController } = require("../controllers");

router.route("/detail").post(DetailController.createDetails);

module.exports = router;
