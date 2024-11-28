module.exports = (sequelize, DataTypes) => {
  const Payment = sequelize.define('Payment', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    jobId: DataTypes.INTEGER,
    operationdate: DataTypes.DATE,
    paymentvalue: DataTypes.DOUBLE,
  });

  Payment.associate = (models) => {
    Payment.belongsTo(models.Job, { foreignKey: 'jobId' });
  };

  return Payment;
};
