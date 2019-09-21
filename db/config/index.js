require('dotenv').config();

module.exports = {
  development: {
    dialect: 'sqlite',
    storage: './expressDataset.db'
  },
  test: {
    dialect: 'sqlite',
    storage: './expressDataset.db',
  },
  production: {
    dialect: 'sqlite',
    storage: './expressDataset.db',
  },
};