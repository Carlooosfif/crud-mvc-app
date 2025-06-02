import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../config/db';
import bcrypt from 'bcryptjs';

interface UserAttributes {
  id: number;
  name: string;
  email: string;
  password: string;
  cedula: string;
  role: 'user' | 'admin';
  createdAt?: Date;
  updatedAt?: Date;
}

interface UserCreationAttributes extends Optional<UserAttributes, 'id' | 'role' | 'createdAt' | 'updatedAt'> {}

class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
  public id!: number;
  public name!: string;
  public email!: string;
  public password!: string;
  public cedula!: string;
  public role!: 'user' | 'admin';
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  // Método para verificar contraseña
  public async matchPassword(enteredPassword: string): Promise<boolean> {
    return await bcrypt.compare(enteredPassword, this.password);
  }
}

User.init(
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
        notEmpty: { msg: 'El nombre es obligatorio' },
        len: { args: [2, 100], msg: 'El nombre debe tener entre 2 y 100 caracteres' }
      }
    },
    email: {
      type: DataTypes.STRING(150),
      allowNull: false,
      unique: true,
      validate: {
        isEmail: { msg: 'Por favor ingrese un email válido' },
        notEmpty: { msg: 'El email es obligatorio' }
      }
    },
    password: {
      type: DataTypes.STRING(255),
      allowNull: false,
      validate: {
        len: { args: [6, 255], msg: 'La contraseña debe tener al menos 6 caracteres' }
      }
    },
    cedula: {
      type: DataTypes.STRING(10),
      allowNull: false,
      unique: true,
      validate: {
        len: { args: [10, 10], msg: 'La cédula debe tener exactamente 10 dígitos' },
        isNumeric: { msg: 'La cédula debe contener solo números' },
        customValidator(value: string) {
          // Validación de cédula ecuatoriana
          if (!/^\d{10}$/.test(value)) {
            throw new Error('La cédula debe tener 10 dígitos');
          }
          
          const digitoVerificador = parseInt(value.substring(9, 10));
          const coeficientes = [2, 1, 2, 1, 2, 1, 2, 1, 2];
          let suma = 0;
          
          for (let i = 0; i < coeficientes.length; i++) {
            let valor = parseInt(value.charAt(i)) * coeficientes[i];
            if (valor > 9) valor -= 9;
            suma += valor;
          }
          
          const digitoCalculado = suma % 10 === 0 ? 0 : 10 - (suma % 10);
          if (digitoCalculado !== digitoVerificador) {
            throw new Error('La cédula ingresada no es válida');
          }
        }
      }
    },
    role: {
      type: DataTypes.ENUM('user', 'admin'),
      defaultValue: 'user',
      allowNull: false
    }
  },
  {
    sequelize,
    modelName: 'User',
    tableName: 'users',
    timestamps: true,
    hooks: {
      beforeCreate: async (user: User) => {
        if (user.password) {
          const salt = await bcrypt.genSalt(10);
          user.password = await bcrypt.hash(user.password, salt);
        }
      },
      beforeUpdate: async (user: User) => {
        if (user.changed('password')) {
          const salt = await bcrypt.genSalt(10);
          user.password = await bcrypt.hash(user.password, salt);
        }
      }
    }
  }
);

export default User;