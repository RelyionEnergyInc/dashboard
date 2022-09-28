const db = require("../models");
const DataSample = db.tutorials;
const Op = db.Sequelize.Op;



// Retrieve all Tutorials from the database.
exports.findAll = (req, res) => {
  const time = req.query.Time;

  DataSample.getAll(time, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tutorials."
      });
    else res.send(data);
  });
};

// Find a single Tutorial with an id
exports.findOne = (req, res) => {
  
};

