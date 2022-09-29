module.exports = app => {
  const datasamples = require("../controllers/datasample.controller.js");

  var router = require("express").Router();


  // Retrieve all Data Samples
  router.get("/", datasamples.findAll);

  // Retrieve a single Data Sample with id
  router.get("/:id", datasamples.findOne);

  app.use('/api/datasamples', router);
};