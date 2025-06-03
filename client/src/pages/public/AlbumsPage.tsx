import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { albumService } from '../../services/albumService';
import { Album } from '../../models';

const AlbumsPage: React.FC = () => {
  const [albums, setAlbums] = useState<Album[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAlbums = async () => {
      try {
        const data = await albumService.getAllAlbums();
        setAlbums(data);
      } catch (error) {
        console.error('Error al cargar álbumes:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAlbums();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          <p className="mt-4 text-gray-600">Cargando álbumes...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <h1 className="text-4xl font-bold text-gray-900 text-center">
            Colecciones de Cartas
          </h1>
          <p className="text-xl text-gray-600 text-center mt-4">
            Explora nuestros álbumes de cartas coleccionables
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {albums.map((album) => (
            <div
              key={album.id}
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
            >
              <div className="h-48 bg-gradient-to-br from-blue-500 via-purple-600 to-indigo-700 flex items-center justify-center">
                <div className="text-6xl font-bold text-white opacity-20">
                  {album.name.charAt(0)}
                </div>
              </div>
              
              <div className="p-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  {album.name}
                </h3>
                <p className="text-gray-600 mb-4 line-clamp-3">
                  {album.description}
                </p>
                
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm text-gray-500">
                    Total de cartas: <span className="font-semibold">{album.totalCards}</span>
                  </span>
                  <span className="text-sm text-gray-500">
                    {new Date(album.releaseDate).getFullYear()}
                  </span>
                </div>

                {album.stats && (
                  <div className="grid grid-cols-3 gap-2 mb-4">
                    <div className="text-center p-2 bg-amber-50 rounded">
                      <div className="text-amber-600 font-bold">🥉</div>
                      <div className="text-sm text-amber-700">{album.stats.bronce}</div>
                    </div>
                    <div className="text-center p-2 bg-gray-50 rounded">
                      <div className="text-gray-600 font-bold">🥈</div>
                      <div className="text-sm text-gray-700">{album.stats.plata}</div>
                    </div>
                    <div className="text-center p-2 bg-yellow-50 rounded">
                      <div className="text-yellow-600 font-bold">🥇</div>
                      <div className="text-sm text-yellow-700">{album.stats.oro}</div>
                    </div>
                  </div>
                )}

                <Link
                  to={`/albums/${album.id}`}
                  className="block w-full bg-blue-600 hover:bg-blue-700 text-white text-center py-3 rounded-lg font-semibold transition-colors"
                >
                  Ver Cartas
                </Link>
              </div>
            </div>
          ))}
        </div>

        {albums.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-xl">No hay álbumes disponibles</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AlbumsPage;