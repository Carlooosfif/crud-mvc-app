import { Request, Response } from 'express';
import { Card, Album } from '../models';

// Obtener cartas de un álbum
export const getCardsByAlbum = async (req: Request, res: Response): Promise<void> => {
  try {
    const { albumId } = req.params;
    const { rarity } = req.query;

    const whereClause: any = { albumId };
    if (rarity) {
      whereClause.rarity = rarity;
    }

    const cards = await Card.findAll({
      where: whereClause,
      order: [['number', 'ASC']]
    });

    // Obtener información del álbum por separado
    const album = await Album.findByPk(albumId);

    res.status(200).json({
      success: true,
      count: cards.length,
      album: album ? { id: album.id, name: album.name } : null,
      data: cards
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Obtener una carta por ID
export const getCardById = async (req: Request, res: Response): Promise<void> => {
  try {
    const card = await Card.findByPk(req.params.id);

    if (!card) {
      res.status(404).json({
        success: false,
        message: 'Carta no encontrada'
      });
      return;
    }

    // Obtener información del álbum por separado
    const album = await Album.findByPk(card.albumId);

    const cardWithAlbum = {
      ...card.toJSON(),
      album: album ? { id: album.id, name: album.name } : null
    };

    res.status(200).json({
      success: true,
      data: cardWithAlbum
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Crear carta (solo admin)
export const createCard = async (req: Request, res: Response): Promise<void> => {
  try {
    const card = await Card.create(req.body);
    
    res.status(201).json({
      success: true,
      data: card
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

// Actualizar carta (solo admin)
export const updateCard = async (req: Request, res: Response): Promise<void> => {
  try {
    const [updatedRows] = await Card.update(req.body, {
      where: { id: req.params.id }
    });

    if (updatedRows === 0) {
      res.status(404).json({
        success: false,
        message: 'Carta no encontrada'
      });
      return;
    }

    const updatedCard = await Card.findByPk(req.params.id);
    
    res.status(200).json({
      success: true,
      data: updatedCard
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

// Eliminar carta (solo admin)
export const deleteCard = async (req: Request, res: Response): Promise<void> => {
  try {
    const deletedRows = await Card.destroy({
      where: { id: req.params.id }
    });

    if (deletedRows === 0) {
      res.status(404).json({
        success: false,
        message: 'Carta no encontrada'
      });
      return;
    }

    res.status(200).json({
      success: true,
      message: 'Carta eliminada correctamente'
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};