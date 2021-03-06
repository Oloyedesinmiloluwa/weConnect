import Sequelize from 'sequelize';
import path from 'path';
import fs from 'fs';
import configjs from '../config/config';

const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = configjs[env];
const db = {};
let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], {
    dialect: 'postgres', protocol: 'postgres', dialectOption: { SSL: true, native: true }, logging: true
  });
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

fs
  .readdirSync(__dirname)
  .filter(file =>
    (file.indexOf('.') !== 0) &&
    (file !== basename) &&
    (file.slice(-3) === '.js'))
  .forEach((file) => {
    const model = sequelize.import(path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;
