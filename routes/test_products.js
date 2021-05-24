/*things I've done:
copy products.js into this file
change /products to /test_products
create test_db.json -> still need to link/route to this somehow
create search.spec.js file
*/


var express = require("express");
var router = express.Router();
const qs = require("qs");

module.exports = function (db = test_db) {
  router
    .route("/test_products")
    .get((req, res) => {
      res.send(db.get("test_products").value());
    })
    .post((req, res) => {
      const newProduct = req.body;

      const errors = [];

      if (!newProduct.name) {
        errors.push({
          field: "name",
          error: "required",
          message: "Name is required",
        });
      }

      if (newProduct.price && isNaN(Number(newProduct.price))) {
        errors.push({
          field: "price",
          error: "type",
          message: "Price must be a number",
        });
      }

      if (newProduct.name > 25) {
        errors.push({
          field: "name",
          error: "length",
          message: "Name cannot be longer than 25 characters",
        });
      }

      const allowedColors = [
        "red",
        "blue",
        "orange",
        "black",
        "brown",
        "",
        null,
        undefined,
      ];

      if (!allowedColors.some((_) => _ === newProduct.color)) {
        errors.push({
          field: "color",
          error: "allowedValue",
          message:
            "Must be one of the following colors: red, blue, orange, black, brown",
        });
      }

      if (errors.length) {
        res.status(422).send(errors);
      } else {
        res.send(db.get("test_products").insert(newProduct).write());
      }
    });

  router.route("/test_products/search").get((req, res) => {
    const keywords = req.query.keywords.split(" ");
    const result = db.get("test_products").filter((_) => {
      const fullText = _.description + _.name + _.color;

      return keywords.every((_) => fullText.indexOf(_) !== -1);
    });

    res.send(result);
  });

  router.route("/test_products/detailSearch").get((req, res) => {
    const query = qs.parse(req.query);

    const results = db.get("test_products").filter((_) => {
      return Object.keys(query).reduce((found, key) => {
        const obj = query[key];
        switch (obj.op) {
          case "lt":
            found = found && _[key] < obj.val;
            break;
          case "eq":
            found = found && _[key] == obj.val;
            break;
          default:
            found = found && _[key].indexOf(obj.val) !== -1;
            break;
        }
        return found;
      }, true);
    });

    res.send(results);
  });

  router
    .route("/test_products/:id")
    .patch((req, res) => {
      res.send(
        db.get("test_products").find({ id: req.params.id }).assign(req.body).write()
      );
    })
    .delete((req, res) => {
      db.get("test_products").remove({ id: req.params.id }).write();
      res.status(204).send();
    })
    .get((req, res) => {
      const result = db.get("test_products").find({ id: req.params.id }).value();
      if (result) {
        res.send(result);
      } else {
        res.status(404).send();
      }
    });
  return router;
};
