import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { User } from '../models';

// Extender la interfaz Request para incluir el usuario
declare global {
  namespace Express {
    interface Request {
      user?: any; // Cambiamos a any por ahora para evitar problemas de tipado
    }
  }
}

// Interfaz para el payload del token
interface JwtPayload {
  id: number; // Cambiamos a number para SQL Server
}

// Middleware para proteger rutas
export const protect = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  let token;

  // Verificar si hay token en el header de autorización
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      // Obtener token del header
      token = req.headers.authorization.split(' ')[1];

      // Verificar token
      const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secretkey') as JwtPayload;

      // Buscar usuario por id
      const user = await User.findByPk(decoded.id);
      
      if (!user) {
        res.status(401).json({
          success: false,
          message: 'Usuario no encontrado'
        });
        return;
      }
      
      req.user = user;
      next();
    } catch (error) {
      res.status(401).json({
        success: false,
        message: 'No autorizado, token inválido'
      });
      return;
    }
  } else {
    res.status(401).json({
      success: false,
      message: 'No autorizado, no hay token'
    });
    return;
  }
};

// Middleware para verificar rol admin
export const admin = (req: Request, res: Response, next: NextFunction): void => {
  if (req.user && req.user.role === 'admin') {
    next();
  } else {
    res.status(403).json({
      success: false,
      message: 'No autorizado, se requiere rol de administrador'
    });
  }
};