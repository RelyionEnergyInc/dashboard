var DataTypes = require("sequelize").DataTypes;
var _InverterTestData = require("./InverterTestData");

function initModels(sequelize) {
  var InverterTestData = _InverterTestData(sequelize, DataTypes);


  return {
    InverterTestData,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
