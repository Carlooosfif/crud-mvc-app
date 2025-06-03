import React, { useState } from 'react';

const CreateAdmin: React.FC = () => {
  const [created, setCreated] = useState(false);
  const [loading, setLoading] = useState(false);
  
  const createAdmin = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: 'Administrador',
          email: 'admin@cardcollection.com',
          password: 'admin123',
          cedula: '1234567890'
        })
      });
      
      const data = await response.json();
      console.log('Respuesta:', data);
      
      if (response.ok) {
        // Actualizar rol a admin después del registro
        await updateToAdmin();
        setCreated(true);
      } else {
        console.error('Error al crear usuario:', data.message);
      }
    } catch (error) {
      console.error('Error:', error);
    }
    setLoading(false);
  };

  const updateToAdmin = async () => {
    try {
      // Necesitaremos crear un endpoint para esto, pero por ahora lo haremos manualmente en SQL
      console.log('Usuario creado. Ahora actualiza manualmente el rol a admin en SQL Server');
    } catch (error) {
      console.error('Error updating role:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow max-w-md">
        {!created ? (
          <div>
            <h1 className="text-2xl font-bold mb-4">Crear Usuario Admin</h1>
            <p className="text-gray-600 mb-4">
              Esto creará un usuario y después deberás actualizar su rol a admin en SQL Server
            </p>
            <button 
              onClick={createAdmin}
              disabled={loading}
              className="bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-50"
            >
              {loading ? 'Creando...' : 'Crear Admin'}
            </button>
          </div>
        ) : (
          <div>
            <h1 className="text-2xl font-bold text-green-600 mb-4">¡Usuario creado!</h1>
            <p className="mb-2">Email: admin@cardcollection.com</p>
            <p className="mb-4">Password: admin123</p>
            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
              <p className="text-sm text-yellow-700">
                <strong>Importante:</strong> Ahora ejecuta esto en SQL Server para convertirlo en admin:
              </p>
              <code className="block mt-2 text-xs bg-gray-100 p-2 rounded">
                UPDATE users SET role = 'admin' WHERE email = 'admin@cardcollection.com';
              </code>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CreateAdmin;