const db = require("../models");
const DataSample = db.invertertestdata;
const Op = db.Sequelize.Op;



// Retrieve all Samples from the database.
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
          err.message || "An error occurred while retrieving Data Samples."
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
          message: `Cannot find sample with id=${id}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving sample with id=" + id
      });
    });
};

exports.findMax = (req, res) => {
  console.log("YES");
  const id = req.params.id;
  res.send("YES");

  // DataSample.max('Time')
  //   .then(data => {
  //     if (data) {
  //       res.send(data);
  //     } else {
  //       res.status(404).send({
  //         message: `Cannot find sample with id=${id}.`
  //       });
  //     }
  //   })
  //   .catch(err => {
  //     res.status(500).send({
  //       message: "Error retrieving sample with id=" + id
  //     });
  //   });
}

exports.stream = (req, res) => {
  res.set({
    'Content-Type': 'text/event-stream',
    'Cache-Control': 'no-cache',
    'Connection': 'keep-alive'
  });
  res.flushHeaders();
  let counter = 0;
  let interValID = setInterval(() => {
      counter++;
      if (counter >= 10) {
          clearInterval(interValID);
          res.end(); // terminates SSE session
          return;
      }
    res.write(`data: ${JSON.stringify({ num: counter })}\n\n`);
      // res.write() instead of res.send()
  }, 1000);
res.on('close', () => {
  console.log('SSE connection closed');
  clearInterval(interValID);
  res.end();
});
}