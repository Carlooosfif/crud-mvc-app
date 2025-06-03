import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const Navbar: React.FC = () => {
  const { user, logout, isAdmin } = useAuth();

  return (
    <nav className="bg-gray-900 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-8">
            <Link to="/" className="text-2xl font-bold text-yellow-400">
              🃏 Card Collection
            </Link>
            
            <div className="hidden md:flex space-x-6">
              <Link to="/albums" className="hover:text-yellow-400 transition-colors">
                Álbumes
              </Link>
              {user && (
                <>
                  {isAdmin() ? (
                    <Link to="/admin" className="hover:text-yellow-400 transition-colors">
                      Admin Panel
                    </Link>
                  ) : (
                    <>
                      <Link to="/dashboard" className="hover:text-yellow-400 transition-colors">
                        Mi Colección
                      </Link>
                      <Link to="/ranking" className="hover:text-yellow-400 transition-colors">
                        Ranking
                      </Link>
                    </>
                  )}
                </>
              )}
            </div>
          </div>

          <div className="flex items-center space-x-4">
            {user ? (
              <>
                <span className="text-sm">
                  Hola, <span className="font-semibold">{user.name}</span>
                  {isAdmin() && (
                    <span className="ml-2 bg-red-600 px-2 py-1 rounded text-xs">
                      Admin
                    </span>
                  )}
                </span>
                <button
                  onClick={logout}
                  className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded transition-colors"
                >
                  Cerrar Sesión
                </button>
              </>
            ) : (
              <div className="space-x-3">
                <Link
                  to="/login"
                  className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded transition-colors"
                >
                  Iniciar Sesión
                </Link>
                <Link
                  to="/register"
                  className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded transition-colors"
                >
                  Registrarse
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;