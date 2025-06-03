import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { albumService } from '../../services/albumService';
import { Album } from '../../models';

const LandingPage: React.FC = () => {
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900">
      {/* Hero Section */}
      <div className="pt-20 pb-32">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-6xl font-bold text-white mb-6">
            🃏 <span className="text-yellow-400">Card Collection</span>
          </h1>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Descubre, colecciona y intercambia las cartas más increíbles. 
            Sumérgete en un mundo lleno de rarezas y aventuras.
          </p>
          
          <div className="space-x-4">
            <Link
              to="/albums"
              className="bg-yellow-500 hover:bg-yellow-600 text-gray-900 px-8 py-4 rounded-lg font-semibold text-lg transition-colors inline-block"
            >
              Ver Colecciones
            </Link>
            <Link
              to="/register"
              className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-gray-900 px-8 py-4 rounded-lg font-semibold text-lg transition-colors inline-block"
            >
              Comenzar Ahora
            </Link>
          </div>
        </div>
      </div>

      {/* Albums Preview Section */}
      <div className="py-16 bg-white bg-opacity-10 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-white text-center mb-12">
            Nuestras Colecciones
          </h2>
          
          {loading ? (
            <div className="text-center">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-400"></div>
              <p className="text-white mt-4">Cargando álbumes...</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {albums.map((album) => (
                <Link
                  key={album.id}
                  to={`/albums/${album.id}`}
                  className="group"
                >
                  <div className="bg-white bg-opacity-20 backdrop-blur-sm rounded-xl p-6 transform group-hover:scale-105 transition-all duration-300 border border-white border-opacity-30">
                    <div className="flex items-center mb-4">
                      <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-lg flex items-center justify-center text-2xl font-bold text-white mr-4">
                        {album.name.charAt(0)}
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-white group-hover:text-yellow-400 transition-colors">
                          {album.name}
                        </h3>
                        <p className="text-gray-300 text-sm">
                          {album.totalCards} cartas
                        </p>
                      </div>
                    </div>
                    
                    <p className="text-gray-300 mb-4 line-clamp-3">
                      {album.description}
                    </p>
                    
                    {album.stats && (
                      <div className="flex space-x-4 text-sm">
                        <span className="bg-amber-600 px-2 py-1 rounded text-white">
                          🥉 {album.stats.bronce} Bronce
                        </span>
                        <span className="bg-gray-400 px-2 py-1 rounded text-white">
                          🥈 {album.stats.plata} Plata
                        </span>
                        <span className="bg-yellow-500 px-2 py-1 rounded text-white">
                          🥇 {album.stats.oro} Oro
                        </span>
                      </div>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          )}
          
          <div className="text-center mt-12">
            <Link
              to="/albums"
              className="text-yellow-400 hover:text-yellow-300 font-semibold text-lg transition-colors"
            >
              Ver todas las colecciones →
            </Link>
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="py-16">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h2 className="text-4xl font-bold text-white mb-6">
            ¿Listo para comenzar tu aventura?
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Únete a miles de coleccionistas y descubre cartas increíbles
          </p>
          <Link
            to="/register"
            className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all transform hover:scale-105"
          >
            Crear Mi Cuenta
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;