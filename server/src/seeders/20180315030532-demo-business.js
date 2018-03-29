module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Businesses', [{
      name: 'John Farm',
      phone: '080666666',
      email: 'yamary@yahoo.com',
      description: 'we sell dog',
      userId: 1,
      location: 'lagos',
      category: 'agriculture',
      review: ['hi'],
      address: 'los angeles'
    }], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Businesses', null, {});
  }
};
