import { api } from './api';
import { Album, ApiResponse } from '../models';

export const albumService = {
  // Obtener todos los álbumes (público)
  getAllAlbums: async (): Promise<Album[]> => {
    const response = await api.get<ApiResponse<Album[]>>('/albums');
    return response.data.data;
  },

  // Obtener álbum por ID con cartas (público)
  getAlbumById: async (id: number): Promise<Album> => {
    const response = await api.get<ApiResponse<Album>>(`/albums/${id}`);
    return response.data.data;
  },

  // Crear álbum (solo admin)
  createAlbum: async (album: Partial<Album>): Promise<Album> => {
    const response = await api.post<ApiResponse<Album>>('/albums', album);
    return response.data.data;
  },

  // Actualizar álbum (solo admin)
  updateAlbum: async (id: number, album: Partial<Album>): Promise<Album> => {
    const response = await api.put<ApiResponse<Album>>(`/albums/${id}`, album);
    return response.data.data;
  },

  // Eliminar álbum (solo admin)
  deleteAlbum: async (id: number): Promise<void> => {
    await api.delete(`/albums/${id}`);
  },
};