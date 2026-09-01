
// module.exports = class Favourite {
//   constructor(houseId) {
//     this.houseId = houseId;
//   }

//   save() {
//     const db = getDB();
//   return db.collection('favourites').findOne({ houseId: this.houseId }).then(ExistFav => {
//       if (!ExistFav) {
//         return db.collection('favourites').insertOne(this);
//       }
//       return Promise.resolve();
//     })
//   }

//   static getFavourite() {
//     const db = getDB();
//     return db.collection('favourites').find().toArray();
//   }

//   static RemoveFromFavourites(removeId) {
//     const db = getDB();
//     return db.collection('favourites').deleteOne({
//       houseId: removeId
//     });
//   }
// };


const mongoose = require('mongoose');

const favouriteSchema = mongoose.Schema({
  houseId: { type: mongoose.Schema.Types.ObjectId, ref: 'Home', unique: true, required: true }
});

module.exports = mongoose.model('Favourite', favouriteSchema);