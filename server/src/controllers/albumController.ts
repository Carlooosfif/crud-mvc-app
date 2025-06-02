import { Request, Response } from 'express';
import { Album, Card } from '../models';

// Obtener todos los álbumes
export const getAllAlbums = async (req: Request, res: Response): Promise<void> => {
  try {
    const albums = await Album.findAll();

    // Obtener estadísticas de cartas por álbum de forma separada
    const albumsWithStats = await Promise.all(
      albums.map(async (album) => {
        const cards = await Card.findAll({ where: { albumId: album.id } });
        
        return {
          id: album.id,
          name: album.name,
          description: album.description,
          imageUrl: album.imageUrl,
          totalCards: album.totalCards,
          releaseDate: album.releaseDate,
          stats: {
            bronce: cards.filter(card => card.rarity === 'bronce').length,
            plata: cards.filter(card => card.rarity === 'plata').length,
            oro: cards.filter(card => card.rarity === 'oro').length,
            total: cards.length
          }
        };
      })
    );

    res.status(200).json({
      success: true,
      count: albums.length,
      data: albumsWithStats
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Obtener un álbum por ID con sus cartas
export const getAlbumById = async (req: Request, res: Response): Promise<void> => {
  try {
    const album = await Album.findByPk(req.params.id);

    if (!album) {
      res.status(404).json({
        success: false,
        message: 'Álbum no encontrado'
      });
      return;
    }

    // Obtener las cartas del álbum por separado
    const cards = await Card.findAll({ 
      where: { albumId: album.id },
      order: [['number', 'ASC']]
    });

    const albumWithCards = {
      id: album.id,
      name: album.name,
      description: album.description,
      imageUrl: album.imageUrl,
      totalCards: album.totalCards,
      releaseDate: album.releaseDate,
      cards: cards
    };

    res.status(200).json({
      success: true,
      data: albumWithCards
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Crear álbum (solo admin)
export const createAlbum = async (req: Request, res: Response): Promise<void> => {
  try {
    const album = await Album.create(req.body);
    
    res.status(201).json({
      success: true,
      data: album
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

// Actualizar álbum (solo admin)
export const updateAlbum = async (req: Request, res: Response): Promise<void> => {
  try {
    const [updatedRows] = await Album.update(req.body, {
      where: { id: req.params.id }
    });

    if (updatedRows === 0) {
      res.status(404).json({
        success: false,
        message: 'Álbum no encontrado'
      });
      return;
    }

    const updatedAlbum = await Album.findByPk(req.params.id);
    
    res.status(200).json({
      success: true,
      data: updatedAlbum
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

// Eliminar álbum (solo admin)
export const deleteAlbum = async (req: Request, res: Response): Promise<void> => {
  try {
    const deletedRows = await Album.destroy({
      where: { id: req.params.id }
    });

    if (deletedRows === 0) {
      res.status(404).json({
        success: false,
        message: 'Álbum no encontrado'
      });
      return;
    }

    res.status(200).json({
      success: true,
      message: 'Álbum eliminado correctamente'
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};