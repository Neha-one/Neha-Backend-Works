const mongodb = require('mongodb');

const mongoClient = mongodb.MongoClient;

const MONGO_URL = "mongodb+srv://nehabaranwal841435_db_user:StayNest12345@algocluster.fje2ela.mongodb.net/?appName=algoCluster"
let _db;

const mongoConnect = (callback) => {
  mongoClient.connect(MONGO_URL)
    .then(client => {
      callback();
      _db = client.db('StayNest');
    }).catch(error => {
      console.log('Error while connecting mongodb: ', error); 
  })
}


const getDB = () => {
  if (!_db) {
    throw new Error('Mongo not connected');

  }
  return _db;
}
exports.mongoConnect = mongoConnect;
exports.getDB = getDB;