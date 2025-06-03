import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { albumService } from '../../services/albumService';
import { Album } from '../../models';

interface UserStats {
  totalCards: number;
  albumsCompleted: number;
  cardsBreakdown: {
    bronce: number;
    plata: number;
    oro: number;
  };
  completionPercentage: number;
}

const UserDashboard: React.FC = () => {
  const { user } = useAuth();
  const [albums, setAlbums] = useState<Album[]>([]);
  const [userStats, setUserStats] = useState<UserStats>({
    totalCards: 0,
    albumsCompleted: 0,
    cardsBreakdown: { bronce: 0, plata: 0, oro: 0 },
    completionPercentage: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const albumsData = await albumService.getAllAlbums();
      setAlbums(albumsData);
      
      // Simulamos estadísticas del usuario (en el futuro esto vendría del backend)
      const mockUserStats: UserStats = {
        totalCards: 142,
        albumsCompleted: 1,
        cardsBreakdown: { bronce: 95, plata: 32, oro: 15 },
        completionPercentage: 71
      };
      
      setUserStats(mockUserStats);
    } catch (error) {
      console.error('Error al cargar datos:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          <p className="mt-4 text-gray-600">Cargando tu colección...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header del Usuario */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="flex items-center space-x-6">
            <div className="w-20 h-20 bg-white bg-opacity-20 rounded-full flex items-center justify-center text-3xl font-bold">
              {user?.name.charAt(0).toUpperCase()}
            </div>
            <div>
              <h1 className="text-3xl font-bold">¡Hola, {user?.name}!</h1>
              <p className="text-blue-200 mt-1">Bienvenido a tu colección de cartas</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Estadísticas del Usuario */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-2 bg-purple-100 rounded-lg">
                <span className="text-2xl">🃏</span>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Cartas Obtenidas</p>
                <p className="text-2xl font-bold text-gray-900">{userStats.totalCards}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-2 bg-green-100 rounded-lg">
                <span className="text-2xl">✅</span>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Álbumes Completados</p>
                <p className="text-2xl font-bold text-gray-900">{userStats.albumsCompleted}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-2 bg-yellow-100 rounded-lg">
                <span className="text-2xl">🏆</span>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Cartas de Oro</p>
                <p className="text-2xl font-bold text-gray-900">{userStats.cardsBreakdown.oro}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 rounded-lg">
                <span className="text-2xl">📊</span>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Progreso Total</p>
                <p className="text-2xl font-bold text-gray-900">{userStats.completionPercentage}%</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Mi Colección */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow">
              <div className="px-6 py-4 border-b border-gray-200">
                <h2 className="text-xl font-bold text-gray-900">Mis Álbumes</h2>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  {albums.map((album) => {
                    // Simulamos el progreso del usuario para cada álbum
                    const userProgress = Math.floor(Math.random() * 100) + 1;
                    const isCompleted = userProgress === 100;
                    
                    return (
                      <div
                        key={album.id}
                        className={`border rounded-lg p-4 transition-all hover:shadow-md ${
                          isCompleted ? 'border-green-300 bg-green-50' : 'border-gray-200'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-4">
                            <div className={`w-12 h-12 rounded-lg flex items-center justify-center text-white font-bold ${
                              isCompleted ? 'bg-green-500' : 'bg-gray-400'
                            }`}>
                              {isCompleted ? '✅' : album.name.charAt(0)}
                            </div>
                            <div>
                              <h3 className="font-semibold text-gray-900">{album.name}</h3>
                              <p className="text-sm text-gray-600">
                                {userProgress === 100 ? 'Completado' : `${userProgress}% completado`}
                              </p>
                            </div>
                          </div>
                          <div className="text-right">
                            <Link
                              to={`/albums/${album.id}`}
                              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-colors"
                            >
                              Ver Cartas
                            </Link>
                          </div>
                        </div>
                        
                        {/* Barra de progreso */}
                        <div className="mt-3">
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div
                              className={`h-2 rounded-full transition-all ${
                                isCompleted ? 'bg-green-500' : 'bg-blue-500'
                              }`}
                              style={{ width: `${userProgress}%` }}
                            ></div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* Panel Lateral */}
          <div className="space-y-6">
            {/* Distribución de Rarezas */}
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Mi Colección</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="text-xl">🥉</span>
                    <span className="text-sm font-medium text-gray-700">Bronce</span>
                  </div>
                  <span className="font-bold text-amber-700">{userStats.cardsBreakdown.bronce}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="text-xl">🥈</span>
                    <span className="text-sm font-medium text-gray-700">Plata</span>
                  </div>
                  <span className="font-bold text-gray-700">{userStats.cardsBreakdown.plata}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="text-xl">🥇</span>
                    <span className="text-sm font-medium text-gray-700">Oro</span>
                  </div>
                  <span className="font-bold text-yellow-700">{userStats.cardsBreakdown.oro}</span>
                </div>
              </div>
            </div>

            {/* Acciones Rápidas */}
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Acciones Rápidas</h3>
              <div className="space-y-3">
                <Link
                  to="/albums"
                  className="block w-full bg-blue-600 hover:bg-blue-700 text-white text-center py-3 rounded-lg font-semibold transition-colors"
                >
                  Explorar Álbumes
                </Link>
                <Link
                  to="/ranking"
                  className="block w-full bg-green-600 hover:bg-green-700 text-white text-center py-3 rounded-lg font-semibold transition-colors"
                >
                  Ver Ranking
                </Link>
                <button
                  className="block w-full bg-purple-600 hover:bg-purple-700 text-white text-center py-3 rounded-lg font-semibold transition-colors"
                  onClick={() => alert('¡Función de packs disponible pronto!')}
                >
                  Abrir Pack 🎁
                </button>
              </div>
            </div>

            {/* Información del Perfil */}
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Mi Perfil</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Nombre:</span>
                  <span className="font-semibold">{user?.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Email:</span>
                  <span className="font-semibold">{user?.email}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Rol:</span>
                  <span className="font-semibold capitalize">{user?.role}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;