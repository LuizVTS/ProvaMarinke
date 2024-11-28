module.exports = (sequelize, DataTypes) => {
  const Deposit = sequelize.define('Deposit', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    clientId: DataTypes.INTEGER,
    operationdate: DataTypes.DATE,
    depositvalue: DataTypes.DOUBLE,
  });

  Deposit.associate = (models) => {
    Deposit.belongsTo(models.Profile, { foreignKey: 'clientId' });
  };

  return Deposit;
};

  