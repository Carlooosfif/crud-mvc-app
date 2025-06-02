import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../config/db';

interface AlbumAttributes {
  id: number;
  name: string;
  description: string;
  imageUrl?: string;
  totalCards: number;
  releaseDate: Date;
  createdAt?: Date;
  updatedAt?: Date;
}

interface AlbumCreationAttributes extends Optional<AlbumAttributes, 'id' | 'imageUrl' | 'createdAt' | 'updatedAt'> {}

class Album extends Model<AlbumAttributes, AlbumCreationAttributes> implements AlbumAttributes {
  public id!: number;
  public name!: string;
  public description!: string;
  public imageUrl?: string;
  public totalCards!: number;
  public releaseDate!: Date;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Album.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
      validate: {
        notEmpty: { msg: 'El nombre del álbum es obligatorio' },
        len: { args: [2, 100], msg: 'El nombre debe tener entre 2 y 100 caracteres' }
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
    totalCards: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 100,
      validate: {
        min: { args: [1], msg: 'El álbum debe tener al menos 1 carta' }
      }
    },
    releaseDate: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW
    }
  },
  {
    sequelize,
    modelName: 'Album',
    tableName: 'albums',
    timestamps: true,
  }
);

export default Album;