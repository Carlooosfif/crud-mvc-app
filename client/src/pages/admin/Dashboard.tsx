import React, { useEffect, useState } from 'react';
import { albumService } from '../../services/albumService';
import { Album } from '../../models';

interface AdminStats {
  totalUsers: number;
  totalAlbums: number;
  totalCards: number;
  cardsBreakdown: {
    bronce: number;
    plata: number;
    oro: number;
  };
}

const AdminDashboard: React.FC = () => {
  const [albums, setAlbums] = useState<Album[]>([]);
  const [stats, setStats] = useState<AdminStats>({
    totalUsers: 0,
    totalAlbums: 0,
    totalCards: 0,
    cardsBreakdown: { bronce: 0, plata: 0, oro: 0 }
  });
  const [loading, setLoading] = useState(true);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [newAlbum, setNewAlbum] = useState({
    name: '',
    description: '',
    totalCards: 100
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const albumsData = await albumService.getAllAlbums();
      setAlbums(albumsData);
      
      // Calcular estadísticas
      const totalAlbums = albumsData.length;
      const totalCards = albumsData.reduce((sum, album) => sum + album.totalCards, 0);
      const cardsBreakdown = albumsData.reduce(
        (acc, album) => {
          if (album.stats) {
            acc.bronce += album.stats.bronce;
            acc.plata += album.stats.plata;
            acc.oro += album.stats.oro;
          }
          return acc;
        },
        { bronce: 0, plata: 0, oro: 0 }
      );

      setStats({
        totalUsers: 15, // Placeholder - en el futuro podríamos obtener esto del backend
        totalAlbums,
        totalCards,
        cardsBreakdown
      });
    } catch (error) {
      console.error('Error al cargar datos:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateAlbum = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await albumService.createAlbum({
        ...newAlbum,
        releaseDate: new Date().toISOString()
      });
      setNewAlbum({ name: '', description: '', totalCards: 100 });
      setShowCreateForm(false);
      fetchData(); // Recargar datos
    } catch (error) {
      console.error('Error al crear álbum:', error);
      alert('Error al crear el álbum');
    }
  };

  const handleDeleteAlbum = async (id: number, name: string) => {
    if (window.confirm(`¿Estás seguro de que deseas eliminar el álbum "${name}"?`)) {
      try {
        await albumService.deleteAlbum(id);
        fetchData(); // Recargar datos
      } catch (error) {
        console.error('Error al eliminar álbum:', error);
        alert('Error al eliminar el álbum');
      }
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          <p className="mt-4 text-gray-600">Cargando dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Panel de Administración</h1>
              <p className="text-gray-600 mt-1">Gestiona álbumes, cartas y estadísticas</p>
            </div>
            <div className="bg-red-100 px-3 py-1 rounded-full">
              <span className="text-red-800 font-semibold text-sm">👑 Administrador</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Estadísticas */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 rounded-lg">
                <span className="text-2xl">👥</span>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Usuarios Registrados</p>
                <p className="text-2xl font-bold text-gray-900">{stats.totalUsers}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-2 bg-green-100 rounded-lg">
                <span className="text-2xl">📚</span>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Álbumes</p>
                <p className="text-2xl font-bold text-gray-900">{stats.totalAlbums}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-2 bg-purple-100 rounded-lg">
                <span className="text-2xl">🃏</span>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Cartas</p>
                <p className="text-2xl font-bold text-gray-900">{stats.totalCards}</p>
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
                <p className="text-2xl font-bold text-gray-900">{stats.cardsBreakdown.oro}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Distribución de Rarezas */}
        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Distribución de Rarezas</h2>
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center p-4 bg-amber-50 rounded-lg">
              <div className="text-3xl mb-2">🥉</div>
              <div className="text-2xl font-bold text-amber-700">{stats.cardsBreakdown.bronce}</div>
              <div className="text-sm text-amber-600">Cartas Bronce</div>
            </div>
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <div className="text-3xl mb-2">🥈</div>
              <div className="text-2xl font-bold text-gray-700">{stats.cardsBreakdown.plata}</div>
              <div className="text-sm text-gray-600">Cartas Plata</div>
            </div>
            <div className="text-center p-4 bg-yellow-50 rounded-lg">
              <div className="text-3xl mb-2">🥇</div>
              <div className="text-2xl font-bold text-yellow-700">{stats.cardsBreakdown.oro}</div>
              <div className="text-sm text-yellow-600">Cartas Oro</div>
            </div>
          </div>
        </div>

        {/* Gestión de Álbumes */}
        <div className="bg-white rounded-lg shadow">
          <div className="px-6 py-4 border-b border-gray-200">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-bold text-gray-900">Gestión de Álbumes</h2>
              <button
                onClick={() => setShowCreateForm(!showCreateForm)}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-semibold transition-colors"
              >
                + Crear Álbum
              </button>
            </div>
          </div>

          {/* Formulario de Creación */}
          {showCreateForm && (
            <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
              <form onSubmit={handleCreateAlbum} className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Nombre del Álbum
                  </label>
                  <input
                    type="text"
                    value={newAlbum.name}
                    onChange={(e) => setNewAlbum({ ...newAlbum, name: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Descripción
                  </label>
                  <input
                    type="text"
                    value={newAlbum.description}
                    onChange={(e) => setNewAlbum({ ...newAlbum, description: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>
                <div className="flex items-end space-x-2">
                  <button
                    type="submit"
                    className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-semibold transition-colors"
                  >
                    Crear
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowCreateForm(false)}
                    className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg font-semibold transition-colors"
                  >
                    Cancelar
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Lista de Álbumes */}
          <div className="p-6">
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Álbum</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Cartas</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Lanzamiento</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Rarezas</th>
                    <th className="text-center py-3 px-4 font-semibold text-gray-700">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {albums.map((album) => (
                    <tr key={album.id} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-4 px-4">
                        <div>
                          <div className="font-semibold text-gray-900">{album.name}</div>
                          <div className="text-sm text-gray-600">{album.description}</div>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <span className="font-semibold">{album.totalCards}</span>
                      </td>
                      <td className="py-4 px-4">
                        <span className="text-sm text-gray-600">
                          {new Date(album.releaseDate).getFullYear()}
                        </span>
                      </td>
                      <td className="py-4 px-4">
                        {album.stats && (
                          <div className="flex space-x-2 text-xs">
                            <span className="bg-amber-100 text-amber-800 px-2 py-1 rounded">
                              🥉 {album.stats.bronce}
                            </span>
                            <span className="bg-gray-100 text-gray-800 px-2 py-1 rounded">
                              🥈 {album.stats.plata}
                            </span>
                            <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded">
                              🥇 {album.stats.oro}
                            </span>
                          </div>
                        )}
                      </td>
                      <td className="py-4 px-4 text-center">
                        <div className="flex justify-center space-x-2">
                          <button
                            onClick={() => {/* TODO: Implementar edición */}}
                            className="bg-blue-100 hover:bg-blue-200 text-blue-700 px-3 py-1 rounded text-sm transition-colors"
                          >
                            Editar
                          </button>
                          <button
                            onClick={() => handleDeleteAlbum(album.id, album.name)}
                            className="bg-red-100 hover:bg-red-200 text-red-700 px-3 py-1 rounded text-sm transition-colors"
                          >
                            Eliminar
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {albums.length === 0 && (
              <div className="text-center py-8">
                <p className="text-gray-500">No hay álbumes creados</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;