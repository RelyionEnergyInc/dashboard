module.exports = app => {
  const datasamples = require("../controllers/datasample.controller.js");

  var router = require("express").Router();


  // Retrieve all Data Samples
  router.get("/", datasamples.findAll);

  router.get("/:id", datasamples.findOne);

  // app.get('*', datasamples);

  app.use('/api/datasamples', router);
};