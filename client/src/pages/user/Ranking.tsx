import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';

interface RankingUser {
  id: number;
  name: string;
  totalCards: number;
  albumsCompleted: number;
  goldCards: number;
  completionPercentage: number;
  position: number;
}

const Ranking: React.FC = () => {
  const { user } = useAuth();
  const [rankings, setRankings] = useState<RankingUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState<'cards' | 'albums' | 'percentage'>('percentage');

  useEffect(() => {
    // Simulamos datos de ranking (en el futuro esto vendría del backend)
    const mockRankings: RankingUser[] = [
      { id: 1, name: 'Carlos Maestro', totalCards: 195, albumsCompleted: 2, goldCards: 28, completionPercentage: 97, position: 1 },
      { id: 2, name: 'Ana Coleccionista', totalCards: 189, albumsCompleted: 1, goldCards: 25, completionPercentage: 94, position: 2 },
      { id: 3, name: 'Luis Pro', totalCards: 167, albumsCompleted: 1, goldCards: 22, completionPercentage: 83, position: 3 },
      { id: 4, name: user?.name || 'Tú', totalCards: 142, albumsCompleted: 1, goldCards: 15, completionPercentage: 71, position: 4 },
      { id: 5, name: 'María Starter', totalCards: 98, albumsCompleted: 0, goldCards: 8, completionPercentage: 49, position: 5 },
      { id: 6, name: 'Pedro Novato', totalCards: 67, albumsCompleted: 0, goldCards: 5, completionPercentage: 33, position: 6 },
      { id: 7, name: 'Sofia Beginne', totalCards: 45, albumsCompleted: 0, goldCards: 3, completionPercentage: 22, position: 7 },
      { id: 8, name: 'Roberto Fresh', totalCards: 23, albumsCompleted: 0, goldCards: 1, completionPercentage: 11, position: 8 },
    ];

    setTimeout(() => {
      setRankings(mockRankings);
      setLoading(false);
    }, 1000);
  }, [user]);

  const sortedRankings = [...rankings].sort((a, b) => {
    switch (sortBy) {
      case 'cards':
        return b.totalCards - a.totalCards;
      case 'albums':
        return b.albumsCompleted - a.albumsCompleted;
      case 'percentage':
        return b.completionPercentage - a.completionPercentage;
      default:
        return a.position - b.position;
    }
  });

  const getRankIcon = (position: number) => {
    switch (position) {
      case 1: return '🥇';
      case 2: return '🥈';
      case 3: return '🥉';
      default: return `#${position}`;
    }
  };

  const getRankColor = (position: number) => {
    switch (position) {
      case 1: return 'text-yellow-600 bg-yellow-50';
      case 2: return 'text-gray-600 bg-gray-50';
      case 3: return 'text-amber-600 bg-amber-50';
      default: return 'text-gray-700 bg-white';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          <p className="mt-4 text-gray-600">Cargando ranking...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <h1 className="text-4xl font-bold text-center">🏆 Ranking de Coleccionistas</h1>
          <p className="text-purple-200 text-center mt-2">Compite con otros coleccionistas y alcanza la cima</p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Controles de ordenamiento */}
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Ordenar por:</h2>
          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => setSortBy('percentage')}
              className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
                sortBy === 'percentage' 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              % Completado
            </button>
            <button
              onClick={() => setSortBy('cards')}
              className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
                sortBy === 'cards' 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              Total de Cartas
            </button>
            <button
              onClick={() => setSortBy('albums')}
              className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
                sortBy === 'albums' 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              Álbumes Completados
            </button>
          </div>
        </div>

        {/* Top 3 Destacado */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {sortedRankings.slice(0, 3).map((rankingUser, index) => (
            <div
              key={rankingUser.id}
              className={`text-center p-6 rounded-xl shadow-lg transform hover:scale-105 transition-transform ${
                index === 0 ? 'bg-gradient-to-b from-yellow-50 to-yellow-100 border-2 border-yellow-300' :
                index === 1 ? 'bg-gradient-to-b from-gray-50 to-gray-100 border-2 border-gray-300' :
                'bg-gradient-to-b from-amber-50 to-amber-100 border-2 border-amber-300'
              }`}
            >
              <div className="text-4xl mb-3">
                {getRankIcon(index + 1)}
              </div>
              <h3 className={`text-xl font-bold mb-2 ${
                rankingUser.name === user?.name ? 'text-blue-600' : 'text-gray-900'
              }`}>
                {rankingUser.name}
                {rankingUser.name === user?.name && ' (Tú)'}
              </h3>
              <div className="space-y-1 text-sm text-gray-600">
                <p><span className="font-semibold">{rankingUser.totalCards}</span> cartas</p>
                <p><span className="font-semibold">{rankingUser.albumsCompleted}</span> álbumes completados</p>
                <p><span className="font-semibold">{rankingUser.completionPercentage}%</span> completado</p>
                <p><span className="font-semibold">{rankingUser.goldCards}</span> cartas de oro</p>
              </div>
            </div>
          ))}
        </div>

        {/* Tabla completa */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-xl font-bold text-gray-900">Ranking Completo</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Posición
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Coleccionista
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Cartas Totales
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Álbumes Completados
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Cartas de Oro
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    % Completado
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {sortedRankings.map((rankingUser, index) => (
                  <tr
                    key={rankingUser.id}
                    className={`hover:bg-gray-50 ${
                      rankingUser.name === user?.name ? 'bg-blue-50 border-l-4 border-blue-500' : ''
                    }`}
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center justify-center w-8 h-8 rounded-full text-sm font-bold ${getRankColor(index + 1)}`}>
                        {getRankIcon(index + 1)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold mr-3 ${
                          rankingUser.name === user?.name ? 'bg-blue-500' : 'bg-gray-400'
                        }`}>
                          {rankingUser.name.charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <div className={`text-sm font-medium ${
                            rankingUser.name === user?.name ? 'text-blue-900' : 'text-gray-900'
                          }`}>
                            {rankingUser.name}
                            {rankingUser.name === user?.name && (
                              <span className="ml-2 text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                                Tú
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      <span className="font-semibold">{rankingUser.totalCards}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      <span className="font-semibold">{rankingUser.albumsCompleted}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      <span className="font-semibold text-yellow-600">{rankingUser.goldCards}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-1 bg-gray-200 rounded-full h-2 mr-3">
                          <div
                            className={`h-2 rounded-full ${
                              rankingUser.completionPercentage >= 90 ? 'bg-green-500' :
                              rankingUser.completionPercentage >= 70 ? 'bg-blue-500' :
                              rankingUser.completionPercentage >= 50 ? 'bg-yellow-500' : 'bg-red-500'
                            }`}
                            style={{ width: `${rankingUser.completionPercentage}%` }}
                          ></div>
                        </div>
                        <span className="text-sm font-semibold text-gray-900">
                          {rankingUser.completionPercentage}%
                        </span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Tu posición destacada */}
        {user && (
          <div className="mt-8 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg p-6 text-center">
            <h3 className="text-2xl font-bold mb-2">Tu Posición Actual</h3>
            <p className="text-blue-100">
              Estás en el puesto #{rankings.find(r => r.name === user.name)?.position || 'N/A'} de {rankings.length} coleccionistas
            </p>
            <p className="text-sm text-blue-200 mt-2">
              ¡Sigue coleccionando para subir en el ranking!
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Ranking;