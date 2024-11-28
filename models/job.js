module.exports = (sequelize, DataTypes) => {
  const Job = sequelize.define('Job', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    contractId: DataTypes.INTEGER,
    description: DataTypes.STRING,
    operationdate: DataTypes.DATE,
    paymentdate: DataTypes.DATE,
    price: DataTypes.DOUBLE,
    paid: DataTypes.BOOLEAN,
  });

  Job.associate = (models) => {
    Job.belongsTo(models.Contract, { foreignKey: 'contractId' });
    Job.hasMany(models.Payment, { foreignKey: 'jobId' });
  };

  return Job;
};

  