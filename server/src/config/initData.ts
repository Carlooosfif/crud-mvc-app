import { User, Album, Card } from '../models';
import { connectDB } from './db';

const initData = async () => {
  try {
    await connectDB();
    
    console.log('Creando datos iniciales...');
    
    // Crear usuario administrador
    const adminExists = await User.findOne({ where: { role: 'admin' } });
    if (!adminExists) {
      await User.create({
        name: 'Administrador',
        email: 'admin@cardcollection.com',
        password: 'admin123',
        cedula: '1234567890', // Cédula ficticia válida
        role: 'admin'
      });
      console.log('Usuario administrador creado');
    }
    
    // Crear álbumes de ejemplo
    const album1Exists = await Album.findOne({ where: { name: 'Álbum Legendario' } });
    if (!album1Exists) {
      const album1 = await Album.create({
        name: 'Álbum Legendario',
        description: 'Colección de cartas legendarias con criaturas míticas',
        totalCards: 100,
        releaseDate: new Date('2024-01-01')
      });
      
      const album2 = await Album.create({
        name: 'Álbum Elemental',
        description: 'Cartas elementales de fuego, agua, tierra y aire',
        totalCards: 100,
        releaseDate: new Date('2024-06-01')
      });
      
      console.log('Álbumes creados');
      
      // Crear cartas de ejemplo para álbum 1
      console.log('Creando cartas del Álbum Legendario...');
      for (let i = 1; i <= 100; i++) {
        const rarity: 'bronce' | 'plata' | 'oro' = i <= 60 ? 'bronce' : i <= 85 ? 'plata' : 'oro';
        
        await Card.create({
          albumId: album1.id,
          number: i,
          name: `Carta Legendaria ${i}`,
          description: `Descripción de la carta legendaria número ${i}`,
          rarity: rarity
        });
      }
      
      // Crear cartas de ejemplo para álbum 2
      console.log('Creando cartas del Álbum Elemental...');
      for (let i = 1; i <= 100; i++) {
        const rarity: 'bronce' | 'plata' | 'oro' = i <= 60 ? 'bronce' : i <= 85 ? 'plata' : 'oro';
        
        await Card.create({
          albumId: album2.id,
          number: i,
          name: `Carta Elemental ${i}`,
          description: `Descripción de la carta elemental número ${i}`,
          rarity: rarity
        });
      }
      
      console.log('Cartas creadas (200 cartas en total)');
    }
    
    console.log('Datos iniciales completados');
    process.exit(0);
  } catch (error) {
    console.error('Error al crear datos iniciales:', error);
    process.exit(1);
  }
};

initData();