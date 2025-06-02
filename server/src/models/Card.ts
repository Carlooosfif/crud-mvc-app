import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../config/db';

interface CardAttributes {
  id: number;
  albumId: number;
  number: number;
  name: string;
  description: string;
  imageUrl?: string;
  rarity: 'bronce' | 'plata' | 'oro';
  createdAt?: Date;
  updatedAt?: Date;
}

interface CardCreationAttributes extends Optional<CardAttributes, 'id' | 'imageUrl' | 'createdAt' | 'updatedAt'> {}

class Card extends Model<CardAttributes, CardCreationAttributes> implements CardAttributes {
  public id!: number;
  public albumId!: number;
  public number!: number;
  public name!: string;
  public description!: string;
  public imageUrl?: string;
  public rarity!: 'bronce' | 'plata' | 'oro';
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Card.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    albumId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'albums',
        key: 'id'
      }
    },
    number: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: { args: [1], msg: 'El número de carta debe ser mayor a 0' }
      }
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
      validate: {
        notEmpty: { msg: 'El nombre de la carta es obligatorio' }
      }
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notEmpty: { msg: 'La descripción es obligatoria' }
      }
    },
    imageUrl: {
      type: DataTypes.STRING(500),
      allowNull: true
    },
    rarity: {
      type: DataTypes.ENUM('bronce', 'plata', 'oro'),
      allowNull: false,
      defaultValue: 'bronce'
    }
  },
  {
    sequelize,
    modelName: 'Card',
    tableName: 'cards',
    timestamps: true,
    indexes: [
      {
        unique: true,
        fields: ['albumId', 'number'] // Un álbum no puede tener dos cartas con el mismo número
      }
    ]
  }
);

export default Card;