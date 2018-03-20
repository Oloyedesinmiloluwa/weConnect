const dotenv = require('dotenv');

dotenv.config();
module.exports = {
  development: {
    username: 'sinmiloluwa',
    password: 'JESUS',
    database: 'dev',
    host: '127.0.0.1',
    port: 5432,
    dialect: 'postgres',
  },
  test: {
    username: process.env.testUserName,
    password: process.env.testPassword,
    database: 'test',
    host: '127.0.0.1',
    port: 5432,
    dialect: 'postgres'
  },
  production: {
    use_env_variable: 'DATABASE_URL'
  }
};
