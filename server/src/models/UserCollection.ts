import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../config/db';

interface UserCollectionAttributes {
  id: number;
  userId: number;
  cardId: number;
  quantity: number;
  condition: 'mint' | 'good' | 'fair' | 'poor';
  obtainedAt: Date;
}

interface UserCollectionCreationAttributes extends Optional<UserCollectionAttributes, 'id' | 'obtainedAt'> {}

class UserCollection extends Model<UserCollectionAttributes, UserCollectionCreationAttributes> implements UserCollectionAttributes {
  public id!: number;
  public userId!: number;
  public cardId!: number;
  public quantity!: number;
  public condition!: 'mint' | 'good' | 'fair' | 'poor';
  public obtainedAt!: Date;
}

UserCollection.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id'
      }
    },
    cardId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'cards',
        key: 'id'
      }
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1,
      validate: {
        min: { args: [1], msg: 'La cantidad debe ser al menos 1' }
      }
    },
    condition: {
      type: DataTypes.ENUM('mint', 'good', 'fair', 'poor'),
      allowNull: false,
      defaultValue: 'good'
    },
    obtainedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW
    }
  },
  {
    sequelize,
    modelName: 'UserCollection',
    tableName: 'user_collections',
    timestamps: false,
    indexes: [
      {
        unique: true,
        fields: ['userId', 'cardId'] // Un usuario no puede tener registros duplicados de la misma carta
      }
    ]
  }
);

export default UserCollection;