const mongoose = require('mongoose');
const config = require('config'); // https://www.npmjs.com/package/config
const db = config.get('mongoURI');

const connectDB = async (uri, callback) => {
  try {
    await mongoose.connect(
      db,
      {
        useNewUrlParser: true,
      },
      error => console.log('Error from MongoDB callback function: ' + error)
    );
    console.log('MongoDB Connected');
  } catch (e) {
    console.log(e.message);
    process.exit(1);
  }
};

module.exports = connectDB;
