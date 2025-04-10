# Implementación CRUD con MVC

Este proyecto implementa una aplicación CRUD (Crear, Leer, Actualizar, Eliminar) completa utilizando el patrón de arquitectura MVC (Modelo-Vista-Controlador). La aplicación está desarrollada con Node.js (Express) en el backend y React con TypeScript en el frontend.

## Estructura del Proyecto MVC

### Backend (Node.js + Express + TypeScript)

- **Modelo (M)**: Implementado en `server/src/models/Product.ts`. Define la estructura de datos y la lógica de negocio utilizando Mongoose para interactuar con MongoDB.

- **Controlador (C)**: Implementado en `server/src/controllers/productController.ts`. Maneja las solicitudes HTTP, procesa los datos y devuelve respuestas apropiadas.

- **Vista (V)**: En una API RESTful, las "vistas" son las respuestas JSON que el backend envía al cliente.

### Frontend (React + TypeScript)

- **Modelo (M)**: Definido en `client/src/models/Product.ts` como interfaces TypeScript que representan la estructura de datos.

- **Vista (V)**: Implementada a través de componentes React en `client/src/components` y `client/src/pages` que renderizan la interfaz de usuario.

- **Controlador (C)**: La lógica de interacción con la API se implementa en `client/src/services/productService.ts`, y los manejadores de eventos en los componentes actúan como controladores.

## Características

- Operaciones CRUD completas para productos
- Validación de formularios
- Alertas de confirmación para operaciones críticas
- Diseño responsivo
- Sistema de navegación entre páginas

## Tecnologías Utilizadas

### Backend
- Node.js
- Express
- TypeScript
- MongoDB
- Mongoose

### Frontend
- React
- TypeScript
- React Router DOM
- React Hook Form
- Axios
- CSS

## Instalación y Configuración

### Requisitos Previos
- Node.js (v14+)
- MongoDB

### Configuración del Backend

1. Navegar al directorio del servidor:
```bash
cd server
```
2. Navegar al directorio del servidor:
```bash
npm install
```
3. Crear un archivo .env con la siguiente información:
```bash
PORT=5000
MONGODB_URI=mongodb://localhost:27017/crud_mvc_db
```
4. Iniciar el servidor en modo desarrollo:
```bash
npm run dev
```

### Configuración del Frontend

1. Navegar al directorio del cliente:
```bash
cd client
```
2. Instalar dependencias:
```bash
npm install
```
3. Iniciar la aplicación React:
```bash
npm start
```

## Uso de la Aplicación

Una vez que tanto el backend como el frontend estén funcionando, puedes acceder a la aplicación en tu navegador:

- **URL**: http://localhost:3000

Desde allí podrás:
- Ver todos los productos en la página principal
- Agregar nuevos productos con el botón "Nuevo Producto"
- Ver detalles de un producto haciendo clic en "Ver"
- Editar productos haciendo clic en "Editar"
- Eliminar productos haciendo clic en "Eliminar"

## Estructura de Directorios
crud-mvc-app/
│
├── client/                      # Frontend (React + TypeScript)
│   ├── public/
│   ├── src/
│   │   ├── components/          # Componentes reutilizables
│   │   ├── models/              # Interfaces y tipos
│   │   ├── pages/               # Páginas de la aplicación
│   │   ├── services/            # Servicios para comunicarse con la API
│   │   ├── App.tsx              # Componente principal
│   │   ├── index.tsx            # Punto de entrada
│   │   └── ...
│
├── server/                      # Backend (Node.js + Express + TypeScript)
│   ├── src/
│   │   ├── controllers/         # Controladores (parte del MVC)
│   │   ├── models/              # Modelos (parte del MVC)
│   │   ├── routes/              # Rutas API
│   │   ├── config/              # Configuraciones
│   │   ├── index.ts             # Punto de entrada
│   │   └── ...
│
└── README.md                    # Este archivo

## API Endpoints

- `GET /api/products`: Obtener todos los productos
- `GET /api/products/:id`: Obtener un producto específico
- `POST /api/products`: Crear un nuevo producto
- `PUT /api/products/:id`: Actualizar un producto existente
- `DELETE /api/products/:id`: Eliminar un producto

## Autor

Ochoa Carlos