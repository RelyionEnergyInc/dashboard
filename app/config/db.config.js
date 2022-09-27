module.exports = {
  HOST: "127.0.0.1",
  USER: "root",
  PASSWORD: "",
  DB: "testdb",
  dialect: "mysql",
  dialectOptions: {
    socketPath: "/tmp/mysql/mysql.sock"
  },
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
};
