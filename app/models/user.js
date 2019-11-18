module.exports = function(sequelize, DataTypes) {
  return sequelize.define('user', {
    id: {
      type: DataTypes.BIGINT(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    discordId: {
      type: DataTypes.STRING(32),
      allowNull: false
    },
    invitedBy: {
      type: DataTypes.STRING(32),
      allowNull: true
    }
  }, {
    tableName: 'user'
  });
};