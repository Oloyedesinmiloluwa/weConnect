// import bcrypt from 'bcryptjs';
const bcrypt = require('bcryptjs');

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('Person', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */
    return queryInterface.bulkInsert('Users', [
      {
        firstName: 'John',
        lastName: 'Michael',
        email: 'sinmi@yahoo.com',
        password: bcrypt.hashSync('tester', 8)
      // isBetaMember: false
      },
      {
        firstName: 'grace',
        lastName: 'Michael',
        email: 'love@yahoo.com',
        password: bcrypt.hashSync('test', 8)
      // // isBetaMember: false
      },
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('Person', null, {});
    */
    return queryInterface.bulkDelete('User', null, {});
  }
};
