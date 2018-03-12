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
    username: 'sinmiloluwa',
    password: 'JESUS',
    database: 'dev',
    host: '127.0.0.1',
    port: 5432,
    dialect: 'postgres'
  },
  production: {
    use_env_variable: 'DATABASE_URL'
  }
};
