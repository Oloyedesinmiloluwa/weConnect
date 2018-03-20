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
    return queryInterface.bulkInsert('Businesses', [{
      name: 'John Farm',
      phone: '080666666',
      email: 'y@ya.co.uk',
      description: 'we sell dog',
      userId: 1,
      location: 'Lagos',
      category: 'Agriculture',
      review: ['hi'],
      address: 'los angeles'

      // isBetaMember: false
    }], {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('Person', null, {});
    */
    return queryInterface.bulkDelete('Businesses', null, {});
  }
};
