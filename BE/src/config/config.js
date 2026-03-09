const mysql = require('mysql2');
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '123456',
  database: 'qlns',
});
db.connect((err) => {
  if (err) {
    console.error('Error connecting to database !!!', err);
    return;
  } else {
    console.log('Connected to database');
  }
});
module.exports = db;
