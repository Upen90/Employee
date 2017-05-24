var mysql = require('mysql');
var pool  = mysql.createPool({
  connectionLimit : 10,
  host            : 'localhost',
  user            : 'root',
  password        : 'admin',
  database        : 'cupid_data'
});
 
module.exports=pool
