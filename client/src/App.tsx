import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/layout/Navbar';
import ProtectedRoute from './components/ProtectedRoute';

// Páginas públicas
import LandingPage from './pages/public/LandingPage';
import AlbumsPage from './pages/public/AlbumsPage';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import Ranking from './pages/user/Ranking';
import { RankingTable } from './components/RankingTable';

// Páginas de administración
import AdminDashboard from './pages/admin/Dashboard';

// Páginas de usuario
import UserDashboard from './pages/user/Dashboard';

import './App.css';

// Componente temporal para páginas pendientes
const ComingSoon: React.FC<{ title: string }> = ({ title }) => (
 <div className="min-h-screen bg-gray-100 flex items-center justify-center">
   <div className="text-center">
     <h1 className="text-4xl font-bold text-gray-900 mb-4">{title}</h1>
     <p className="text-gray-600">Esta página estará disponible pronto</p>
   </div>
 </div>
);

function App() {
 return (
   <Router>
     <AuthProvider>
       <div className="App">
         <Navbar />
         <Routes>
           {/* Rutas públicas */}
           <Route path="/" element={<LandingPage />} />
           <Route path="/albums" element={<AlbumsPage />} />
           <Route path="/login" element={<Login />} />
           <Route path="/register" element={<Register />} />
           <Route path="/ranking" element={<RankingTable />} />
           
           {/* Rutas protegidas - Solo usuarios autenticados */}
           <Route path="/dashboard" element={
             <ProtectedRoute>
               <UserDashboard />
             </ProtectedRoute>
           } />
           
           {/* Rutas protegidas - Solo administradores */}
           <Route path="/admin" element={
             <ProtectedRoute requireAdmin>
               <AdminDashboard />
             </ProtectedRoute>
           } />
           
           {/* Rutas temporales */}
           <Route path="/ranking" element={
               <ProtectedRoute>
                 <Ranking />
               </ProtectedRoute>
            } />
           <Route path="/albums/:id" element={<ComingSoon title="Detalles del Álbum" />} />
         </Routes>
       </div>
     </AuthProvider>
   </Router>
 );
}

export default App;