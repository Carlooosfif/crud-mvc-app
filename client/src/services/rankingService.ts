import axios from 'axios';

export interface RankingEntry {
  userId: number;
  userName: string;
  uniqueCards: number;
  totalCards: number;
  rarityScore: number;
  recentActivity: number;
  totalScore: number;
  position: number;
}

class RankingService {
  private baseURL = '/api';

  async getRanking(period: string = 'all') {
    console.log('📥 [BACKEND] Entró a /api/ranking');
  try {
    const token = localStorage.getItem('token'); // asegúrate que existe

    const response = await axios.get(`${this.baseURL}/ranking`, {
      params: { period },
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    console.log('Respuesta recibida:', response.data);

    const { ranking, period: periodLabel } = response.data.data;
    return { ranking, period: periodLabel };
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Error al obtener ranking');
  }
}

  async getStats() {
    try {
      const response = await axios.get(`${this.baseURL}/ranking/stats`);
      return response.data.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Error al obtener estadísticas');
    }
  }
}

export const rankingService = new RankingService();