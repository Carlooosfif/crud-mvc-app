import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

const sequelize = new Sequelize({
  database: process.env.DB_NAME as string,
  username: process.env.DB_USER as string,
  password: process.env.DB_PASSWORD as string,
  host: process.env.DB_HOST as string, // Debe ser 'localhost'
  dialect: 'mssql',
  dialectOptions: {
    options: {
      encrypt: false,
      trustServerCertificate: true,
      instanceName: 'SQLEXPRESS'
    }
  },
  logging: console.log,
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
});


const connectDB = async (): Promise<void> => {
  try {
    console.log('🔗 Conectando a SQL Server...');
    console.log('Host:', process.env.DB_HOST);
    console.log('Database:', process.env.DB_NAME);

    await sequelize.authenticate();
    console.log('✅ SQL Server conectado exitosamente');

    await sequelize.sync({ force: false });
    console.log('✅ Tablas sincronizadas correctamente');
  } catch (error) {
    console.error('❌ Error al conectar SQL Server:', error);
    process.exit(1);
  }
};

export { sequelize, connectDB };
export default connectDB;
