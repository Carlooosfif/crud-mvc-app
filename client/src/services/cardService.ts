import { api } from './api';
import { Card, ApiResponse } from '../models';

export const cardService = {
  // Obtener cartas de un álbum
  getCardsByAlbum: async (albumId: number, rarity?: string): Promise<Card[]> => {
    const params = rarity ? { rarity } : {};
    const response = await api.get<ApiResponse<Card[]>>(`/cards/album/${albumId}`, { params });
    return response.data.data;
  },

  // Obtener carta por ID
  getCardById: async (id: number): Promise<Card> => {
    const response = await api.get<ApiResponse<Card>>(`/cards/${id}`);
    return response.data.data;
  },

  // Crear carta (solo admin)
  createCard: async (card: Partial<Card>): Promise<Card> => {
    const response = await api.post<ApiResponse<Card>>('/cards', card);
    return response.data.data;
  },

  // Actualizar carta (solo admin)
  updateCard: async (id: number, card: Partial<Card>): Promise<Card> => {
    const response = await api.put<ApiResponse<Card>>(`/cards/${id}`, card);
    return response.data.data;
  },

  // Eliminar carta (solo admin)
  deleteCard: async (id: number): Promise<void> => {
    await api.delete(`/cards/${id}`);
  },
};