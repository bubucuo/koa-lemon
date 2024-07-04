const mysql = require("mysql2");

const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "111111",
  database: "dev",
  port: 3307,
});

function query(sql) {
  return new Promise((res, rej) => {
    pool.getConnection(function (err, connection) {
      if (err) {
        rej(err);
      } else {
        connection.query(sql, (err, rows) => {
          if (err) {
            rej(err);
          } else {
            res(rows);
          }
          connection.release();
        });
      }
    });
  });
}

module.exports = { query };
