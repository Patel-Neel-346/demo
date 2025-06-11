/**
 * Model class for "domain"
 *

 *
 * @param {Sequelize} sequelize - Sequelize instance
 * @param {Sequelize.DataTypes} DataTypes - Sequelize datatypes
 *
 * @returns Domain - Sequelize model for domain entity
 */
export default (sequelize, DataTypes) => {
  const Domain = sequelize.define(
    'Domain',
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      status: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        comment: 'active or inactive',
      },
      assigned_to: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      created_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
    },
    {
      tableName: 'domains',
      underscored: true,
      timestamps: false, // because you only have created_at, no updated_at
    },
  );

  Domain.associate = _models => {
    // Example association (if you have a User model or similar)
    // Domain.belongsTo(models.User, { foreignKey: 'assigned_to', targetKey: 'id' });
  };

  return Domain;
};
