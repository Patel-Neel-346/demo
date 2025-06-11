/**
 * Model class for "promocode"
 *
 * @param {Sequelize} sequelize - Sequelize instance
 * @param {Sequelize.DataTypes} DataTypes - Sequelize datatypes
 *
 * @returns Promocode - Sequelize model for promocode entity
 */
export default (sequelize, DataTypes) => {
  const Promocode = sequelize.define(
    'Promocode',
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      code: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          notEmpty: true,
          len: [3, 50],
        },
      },
      discount_type: {
        type: DataTypes.ENUM('percentage', 'fixed'),
        allowNull: false,
      },
      discount_value: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
        validate: {
          min: 0.01,
        },
      },
      status: {
        type: DataTypes.ENUM('active', 'inactive'),
        allowNull: false,
        defaultValue: 'active',
      },
      expires_at: {
        type: DataTypes.DATE,
        allowNull: true,
        validate: {
          isDate: true,
          isAfter: new Date().toISOString(),
        },
      },
      usage_limit: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
        validate: {
          min: 0,
        },
      },
      used: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
        validate: {
          min: 0,
        },
      },
      assigned_to: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      created_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
      updated_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
    },
    {
      tableName: 'promocodes',
      underscored: true,
      timestamps: true,
      hooks: {
        beforeValidate: promocode => {
          // Convert code to uppercase for consistency
          if (promocode.code) {
            promocode.code = promocode.code.toUpperCase();
          }

          // Validate percentage discount
          if (
            promocode.discount_type === 'percentage' &&
            promocode.discount_value > 100
          ) {
            throw new Error('Percentage discount cannot exceed 100%');
          }
        },
        beforeSave: promocode => {
          // Ensure used count doesn't exceed usage limit
          if (
            promocode.usage_limit > 0 &&
            promocode.used > promocode.usage_limit
          ) {
            throw new Error('Used count cannot exceed usage limit');
          }
        },
      },
    },
  );

  Promocode.associate = models => {
    // Association with User model if it exists
    // Promocode.belongsTo(models.User, { foreignKey: 'assigned_to', targetKey: 'id' });
  };

  return Promocode;
};
