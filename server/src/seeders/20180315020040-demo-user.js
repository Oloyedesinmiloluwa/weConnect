// import bcrypt from 'bcryptjs';
const bcrypt = require('bcryptjs');

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [
      {
        firstName: 'John',
        lastName: 'Michael',
        email: 'sinmiloluwasunday@yahoo.com',
        notify: true,
        password: bcrypt.hashSync('tester', 8)
      // isBetaMember: false
      },
      {
        firstName: 'grace',
        lastName: 'Michael',
        email: 'love@yahoo.com',
        notify: false,
        password: bcrypt.hashSync('test', 8)
      // // isBetaMember: false
      },
      {
        firstName: 'admin',
        lastName: 'admin',
        email: 'admin@weconnect.com',
        notify: false,
        password: bcrypt.hashSync('admin', 8)
      // isBetaMember: false
      }
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('User', null, {});
  }
};
