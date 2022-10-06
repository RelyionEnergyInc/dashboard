const db = require("../models");
const DataSample = db.invertertestdata;
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

exports.findOne = (req, res) => {
  console.log("YES");
  const id = req.params.id;

  DataSample.findByPk(id)
    .then(data => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Tutorial with id=${id}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Tutorial with id=" + id
      });
    });
};