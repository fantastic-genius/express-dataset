require('dotenv').config();
const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const configFile = require('../config');

const env = process.env.NODE_ENV || 'development';
const basename = path.basename(__filename);
const db = {};
const config = configFile[env];
let sequelize;

sequelize = new Sequelize({
    dialect: config.dialect,
    storage: config.storage
});

fs.readdirSync(__dirname)
  .filter(file => file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.js')
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

module.exports = db;
