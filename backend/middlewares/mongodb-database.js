require('dotenv').config();
const mongoose = require('mongoose');
const { Schema } = mongoose;

const connectMongoDB = async () => {
  try {
    const uri = process.env.MONGO_URI + process.env.MONGO_DATABASE;
    const conn = await mongoose.connect(uri, {
      useNewUrlParser: true,
    });
    // return conn;
    console.log(`MongoDB connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`MongoDB database error: `, error.message);
    process.exit(1);
  }
};

module.exports = { mongoose, connectMongoDB, Schema };
