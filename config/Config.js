const mysql = require('mysql2/promise');

// MySQL connection configuration
const dbConfig = {
    host: 'your_mysql_host',
    user: 'your_mysql_user',
    password: 'your_mysql_password',
    database: 'your_database_name',
  };

  module.exports = dbConfig