import User from './User';
import Album from './Album';
import Card from './Card';
import UserCollection from './UserCollection';

// Definir relaciones
Album.hasMany(Card, {
  foreignKey: 'albumId',
  as: 'cards'
});

Card.belongsTo(Album, {
  foreignKey: 'albumId',
  as: 'album'
});

User.hasMany(UserCollection, {
  foreignKey: 'userId',
  as: 'collections'
});

UserCollection.belongsTo(User, {
  foreignKey: 'userId',
  as: 'user'
});

Card.hasMany(UserCollection, {
  foreignKey: 'cardId',
  as: 'collections'
});

UserCollection.belongsTo(Card, {
  foreignKey: 'cardId',
  as: 'card'
});

export {
  User,
  Album,
  Card,
  UserCollection
};