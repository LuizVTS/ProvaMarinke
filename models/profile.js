module.exports = (sequelize, DataTypes) => {
  const Profile = sequelize.define('Profile', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    firstname: DataTypes.STRING,
    lastname: DataTypes.STRING,
    profession: DataTypes.STRING,
    balance: DataTypes.DOUBLE,
    type: DataTypes.STRING,
  });

  Profile.associate = (models) => {
    Profile.hasMany(models.Contract, { as: 'ClientContracts', foreignKey: 'clientId' });
    Profile.hasMany(models.Contract, { as: 'ContractorContracts', foreignKey: 'contractorId' });
    Profile.hasMany(models.Deposit, { foreignKey: 'clientId' });
  };

  return Profile;
};
