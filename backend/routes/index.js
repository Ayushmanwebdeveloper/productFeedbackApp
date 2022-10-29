const express = require("express");
const router = express.Router();

const apiRouter = require("./api");
router.use("/api", apiRouter);/*All the URLs of the routes in the api router
will be prefixed with /api.*/

router.get("/hello/world", function (req, res) {
  res.cookie("XSRF-TOKEN", req.csrfToken());
  res.send("Hello World!");
});

module.exports = router;