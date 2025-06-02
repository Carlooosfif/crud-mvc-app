import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db';
import authRoutes from './routes/authRoutes';
import albumRoutes from './routes/albumRoutes';
import cardRoutes from './routes/cardRoutes';

// Cargar variables de entorno
dotenv.config();

// Inicializar Express
const app = express();
const PORT = process.env.PORT || 5000;

// Conectar a SQL Server
connectDB();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rutas
app.use('/api/auth', authRoutes);
app.use('/api/albums', albumRoutes);
app.use('/api/cards', cardRoutes);

// Ruta de prueba
app.get('/', (req, res) => {
  res.send('Card Collection API funcionando correctamente');
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor ejecutándose en puerto ${PORT}`);
});