import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { User } from '../models';

// Generar token JWT
const generateToken = (id: number): string => {
  return jwt.sign({ id }, process.env.JWT_SECRET || 'secretkey', {
    expiresIn: '30d'
  });
};

// Registrar usuario
export const register = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, email, password, cedula } = req.body;

    // Verificar si el usuario ya existe
    const userExists = await User.findOne({ where: { email } });
    if (userExists) {
      res.status(400).json({
        success: false,
        message: 'El usuario ya existe'
      });
      return;
    }

    // Crear nuevo usuario
    const user = await User.create({
      name,
      email,
      password,
      cedula
    });

    res.status(201).json({
      success: true,
      data: {
        id: user.id,
        name: user.name,
        email: user.email,
        cedula: user.cedula,
        role: user.role,
        token: generateToken(user.id)
      }
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

// Login de usuario
export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;

    // Buscar usuario (Sequelize incluye password por defecto, no necesitamos select)
    const user = await User.findOne({ where: { email } });

    // Verificar si el usuario existe y la contraseña es correcta
    if (!user || !(await user.matchPassword(password))) {
      res.status(401).json({
        success: false,
        message: 'Email o contraseña incorrectos'
      });
      return;
    }

    // Si todo es correcto, enviar datos del usuario y token
    res.status(200).json({
      success: true,
      data: {
        id: user.id,
        name: user.name,
        email: user.email,
        cedula: user.cedula,
        role: user.role,
        token: generateToken(user.id)
      }
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Obtener perfil del usuario
export const getProfile = async (req: Request, res: Response): Promise<void> => {
  try {
    if (!req.user) {
      res.status(401).json({
        success: false,
        message: 'No autorizado'
      });
      return;
    }

    res.status(200).json({
      success: true,
      data: {
        id: req.user.id,
        name: req.user.name,
        email: req.user.email,
        cedula: req.user.cedula,
        role: req.user.role
      }
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};