const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('DataSample', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    Time: {
      type: DataTypes.DATE,
      allowNull: true
    },
    freq: {
      type: DataTypes.DECIMAL(38,0),
      allowNull: false
    },
    Vab: {
      type: DataTypes.DECIMAL(38,0),
      allowNull: false
    },
    Vbc: {
      type: DataTypes.DECIMAL(38,0),
      allowNull: false
    },
    Vca: {
      type: DataTypes.DECIMAL(38,0),
      allowNull: false
    },
    Van: {
      type: DataTypes.DECIMAL(38,0),
      allowNull: false
    },
    Vbn: {
      type: DataTypes.DECIMAL(38,0),
      allowNull: false
    },
    Vcn: {
      type: DataTypes.DECIMAL(38,0),
      allowNull: false
    },
    pf: {
      type: DataTypes.DECIMAL(38,0),
      allowNull: false
    },
    'Real Power': {
      type: DataTypes.DECIMAL(38,0),
      allowNull: false
    },
    'Reactive Power': {
      type: DataTypes.DECIMAL(38,0),
      allowNull: false
    },
    'Apparent Power': {
      type: DataTypes.DECIMAL(38,0),
      allowNull: false
    },
    Ia: {
      type: DataTypes.DECIMAL(38,0),
      allowNull: false
    },
    Ib: {
      type: DataTypes.DECIMAL(38,0),
      allowNull: false
    },
    Ic: {
      type: DataTypes.DECIMAL(38,0),
      allowNull: false
    },
    'P2 Ctrl Method': {
      type: DataTypes.DECIMAL(38,0),
      allowNull: false
    },
    'P2 throttle setpt': {
      type: DataTypes.DECIMAL(38,0),
      allowNull: false
    },
    'P2 current setpt': {
      type: DataTypes.DECIMAL(38,0),
      allowNull: false
    },
    'P2 power setpt': {
      type: DataTypes.DECIMAL(38,0),
      allowNull: false
    },
    'P2 voltage setpt': {
      type: DataTypes.DECIMAL(38,0),
      allowNull: false
    },
    'P2 Vmax Limit': {
      type: DataTypes.DECIMAL(38,0),
      allowNull: false
    },
    'P2 Vmin Limit': {
      type: DataTypes.DECIMAL(38,0),
      allowNull: false
    },
    'P2 Dischg PWR limit': {
      type: DataTypes.DECIMAL(38,0),
      allowNull: false
    },
    'P2 Chg PWR limit': {
      type: DataTypes.DECIMAL(38,0),
      allowNull: false
    },
    'P2 current limit': {
      type: DataTypes.DECIMAL(38,0),
      allowNull: false
    },
    'P2 Voltage': {
      type: DataTypes.DECIMAL(38,0),
      allowNull: false
    },
    'P2 Power': {
      type: DataTypes.DECIMAL(38,0),
      allowNull: false
    },
    'P2  Current': {
      type: DataTypes.DECIMAL(38,0),
      allowNull: false
    },
    'P3 Ctrl Method': {
      type: DataTypes.DECIMAL(38,0),
      allowNull: false
    },
    'P3 throttle setpt': {
      type: DataTypes.DECIMAL(38,0),
      allowNull: false
    },
    'P3 current setpt': {
      type: DataTypes.DECIMAL(38,0),
      allowNull: false
    },
    'P3 power setpt': {
      type: DataTypes.DECIMAL(38,0),
      allowNull: false
    },
    'P3 voltage setpt': {
      type: DataTypes.DECIMAL(38,0),
      allowNull: false
    },
    'P3 Vmax Limit': {
      type: DataTypes.DECIMAL(38,0),
      allowNull: false
    },
    'P3 Vmin Limit': {
      type: DataTypes.DECIMAL(38,0),
      allowNull: false
    },
    'P3 Dischg PWR limit': {
      type: DataTypes.DECIMAL(38,0),
      allowNull: false
    },
    'P3 Chg PWR limit': {
      type: DataTypes.DECIMAL(38,0),
      allowNull: false
    },
    'P3 Current limit': {
      type: DataTypes.DECIMAL(38,0),
      allowNull: false
    },
    'P3 voltage': {
      type: DataTypes.DECIMAL(38,0),
      allowNull: false
    },
    'P3 power': {
      type: DataTypes.DECIMAL(38,0),
      allowNull: false
    },
    'P3 current': {
      type: DataTypes.DECIMAL(38,0),
      allowNull: false
    },
    'Avg PM Temp': {
      type: DataTypes.DECIMAL(38,0),
      allowNull: false
    },
    'AC PM Temp': {
      type: DataTypes.DECIMAL(38,0),
      allowNull: false
    },
    'DC PM Temp': {
      type: DataTypes.DECIMAL(38,0),
      allowNull: false
    },
    'Onboard Temp': {
      type: DataTypes.DECIMAL(38,0),
      allowNull: false
    },
    'Fan Speed': {
      type: DataTypes.DECIMAL(38,0),
      allowNull: false
    },
    'System Status': {
      type: DataTypes.DECIMAL(38,0),
      allowNull: false
    },
    'System Power': {
      type: DataTypes.DECIMAL(38,0),
      allowNull: false
    },
    'Grid Support Status': {
      type: DataTypes.DECIMAL(38,0),
      allowNull: false
    },
    'Link Peak Voltage': {
      type: DataTypes.DECIMAL(38,0),
      allowNull: false
    },
    'Link Peak Current': {
      type: DataTypes.DECIMAL(38,0),
      allowNull: false
    },
    'Grid Level Status': {
      type: DataTypes.DECIMAL(38,0),
      allowNull: false
    },
    'Grid Stop Status': {
      type: DataTypes.DECIMAL(38,0),
      allowNull: false
    },
    'Pack P2 Voltage': {
      type: DataTypes.DECIMAL(38,3),
      allowNull: false
    },
    'Pack P3 Voltage': {
      type: DataTypes.DECIMAL(38,3),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'InverterTestData',
    timestamps: false
  });
};
