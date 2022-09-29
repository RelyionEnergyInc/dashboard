const db = require("../models");
const DataSample = db.tutorials;
const Op = db.Sequelize.Op;



// Retrieve all Tutorials from the database.
exports.findAll = (req, res) => {
  const time = req.query.Time;
  var condition = time ? { Time: { [Op.like]: `%${time}%` } } : null;

  DataSample.findAll({ where: condition })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Idk an error occurred while retrieving Data Samples."
      });
    });
};


