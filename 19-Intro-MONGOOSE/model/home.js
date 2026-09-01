// const { ObjectId } = require('mongodb');

// module.exports = class Home {
//   constructor(imageURL, houseName, housePrice, location, rating, description, _id) {
//     this.imageURL = imageURL;
//     this.houseName = houseName;
//     this.housePrice = housePrice;
//     this.location = location;
//     this.rating = rating;
//     this.description = description;
//     if (_id) {
//       this._id = _id;
//     }
//   }

//   save() {
//     const db = getDB();
//     if (this._id) {
//       const updateFields = {
//         imageURL: this.imageURL,
//         houseName: this.houseName,
//         housePrice: this.housePrice,
//         location: this.location,
//         rating: this.rating,
//         description: this.description
//       }
//       return db.collection('home').updateOne({ _id: new ObjectId(String(this._id)) }, { $set: updateFields })

//     }
//     else {
//       return db.collection('home').insertOne(this);

//     }
//   }

//   static find() {

//     const db = getDB();
//     return db.collection('home').find().toArray();
//   }

//   static findById(homeId) {
//     const db = getDB();
//     return db.collection('home').find({ _id: new ObjectId(String(homeId)) }).next();
//   }

//   static DeleteById(homeId) {
//     const db = getDB();
//     return db.collection('home').deleteOne({
//       _id: new ObjectId(homeId)
//     });
//   }
// };

const mongoose = require('mongoose');
const favourite = require('./favourite');

const homeSchema = mongoose.Schema({
  houseName: { type: String, required: true },
  housePrice: { type: Number, required: true },
  location: { type: String, required: true },
  rating: { type: Number, required: true },
  imageURL: String, description: String,
})

homeSchema.pre('findOneAndDelete', async function () {
  const homeId = this.getQuery()._id;
  await favourite.deleteMany({ houseId: homeId });
})

module.exports = mongoose.model('Home', homeSchema)