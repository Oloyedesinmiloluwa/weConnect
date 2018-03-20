module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    firstName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    notify: {
      type: DataTypes.BOOLEAN
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        args: true,
        msg: 'email already exists',
      },
      validate: {
        isEmail: {
          args: true,
          msg: 'Please provide a valid email address',
        },
      },

    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    profilePicture: DataTypes.STRING,
  });

  User.associate = (models) => {
    // associations can be defined here
    User.hasMany(models.Business, {
      foreignKey: 'userId',
      as: 'userBusinesses',
    });
  };
  return User;
};
