var express = require("express");
var router = express.Router();

module.exports = function (db) {
  router
    .route("/products")
    .get((req, res) => {    //read
      res.send(db.get("products").value());
    })
    .post((req, res) => {  //create
      const newProduct = req.body;
      res.send(db.get("products").insert(newProduct).write()); //won't actually get saved without write
    });

  router.route("/products/:id")
    .patch((req, res) => {  //update
      res.send(db.get("products").find({ id: req.params.id }).assign(req.body).write());
    })
    .delete((req, res) => {    //delete
      db.get("products").remove({ id: req.params.id }).write();
      res.status(204).send();
    })
    .get((req, res) => { //read/return specific product
      res.send(db.get("products").find({ id: req.params.id }).value());
    });

  return router;
};
