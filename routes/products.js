var express = require("express");
var router = express.Router();

module.exports = function (db) {
  router.get("/products", () => {
    return db.get("products").value();
  });
  return router;
};
