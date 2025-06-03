// src/models/index.ts
export interface User {
  id: number;
  name: string;
  email: string;
  cedula: string;
  role: 'user' | 'admin';
  token: string;
}

export interface Album {
  id: number;
  name: string;
  description: string;
  imageUrl?: string;
  totalCards: number;
  releaseDate: string;
  stats?: {
    bronce: number;
    plata: number;
    oro: number;
    total: number;
  };
}

export interface Card {
  id: number;
  albumId: number;
  number: number;
  name: string;
  description: string;
  imageUrl?: string;
  rarity: 'bronce' | 'plata' | 'oro';
  album?: {
    id: number;
    name: string;
  };
}

export interface UserCollection {
  id: number;
  userId: number;
  cardId: number;
  quantity: number;
  condition: 'mint' | 'good' | 'fair' | 'poor';
  obtainedAt: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  count?: number;
  message?: string;
}