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