module.exports = (sequelize, DataTypes) => {
  const Business = sequelize.define('Business', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: DataTypes.STRING,
    userId: DataTypes.INTEGER,
    location: DataTypes.STRING,
    category: DataTypes.STRING,
    phone: DataTypes.STRING,
    review: DataTypes.ARRAY(DataTypes.STRING),
    address: DataTypes.STRING,
    image: DataTypes.STRING
  });
  Business.associate = (models) => {
    // associations can be defined here
    Business.belongsTo(models.User, {
      foreignKey: 'userId',
      onDelete: 'CASCADE',
    });
  };
  return Business;
};
