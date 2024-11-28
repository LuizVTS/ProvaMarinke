module.exports = (sequelize, DataTypes) => {
  const Contract = sequelize.define('Contract', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    terms: DataTypes.STRING,
    clientId: DataTypes.INTEGER,
    contractorId: DataTypes.INTEGER,
    operationdate: DataTypes.DATE,
    status: DataTypes.STRING,
  });

  Contract.associate = (models) => {
    Contract.belongsTo(models.Profile, { as: 'Client', foreignKey: 'clientId' });
    Contract.belongsTo(models.Profile, { as: 'Contractor', foreignKey: 'contractorId' });
    Contract.hasMany(models.Job, { foreignKey: 'contractId' });
  };

  return Contract;
};


