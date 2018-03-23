module.exports = {
  up: (queryInterface, Sequelize) => {
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
    }], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Businesses', null, {});
  }
};
