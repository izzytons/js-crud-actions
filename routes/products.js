var express = require("express");
var router = express.Router();
const qs = require('qs');

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

  router.route('/products/search').get((req, res) => {
    const keywords = req.query.keywords;
    const result = db.get("products").filter(_ => {
      const fullText = _.description + _.name + _.color;
      return fullText.indexOf(keywords) !== -1;
    });

    res.send(result);
  });

  router.route('/products/detailSearch').get((req, res) => {
    const query = qs.parse(req.query);

    const results = db.get("products").filter(_ => {
      return Object.keys(query).reduce((found, key) => {
        const obj = query[key];
        found = found && _[key] == obj.valueOf;
        return found;
      }, true)
    });

    res.send(results);
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
      const result = db.get("products").find({ id: req.params.id }).value();
      if (result) {
        res.send(result);
      } else {
        res.status(404).send();
      }
    });



  return router;
};
