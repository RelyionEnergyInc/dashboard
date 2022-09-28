module.exports = app => {
  const datasamples = require("../controllers/datasample.controller.js");

  var router = require("express").Router();


  // Retrieve all Tutorials
  router.get("/", datasamples.findAll);

  // Retrieve a single Tutorial with id
  router.get("/:id", datasamples.findOne);

  app.use('/api/datasamples', router);
};