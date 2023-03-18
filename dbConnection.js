const mongoose = require('mongoose');
require('dotenv').config();

mongoose.set('strictQuery', false);

dbURI = 'mongodb://localhost:27017';
//dbURI = 'mongodb://temp:user@localhost:27017/?authSource=hackatonDB'
//dbURI = `mongodb://${process.env.MONGO_INITDB_ROOT_USERNAME}:${process.env.MONGO_INITDB_ROOT_PASSWORD}@mongo27017/hackatonDB`;

mongoose.connect(dbURI, {
    maxPoolSize: 50,
    useUnifiedTopology: true,
    authSource: 'hackatonDB',
    //user: 'temp',
    //pass: 'user',
    //user: process.env.MONGO_INITDB_ROOT_USERNAME,
    //pass: process.env.MONGO_INITDB_ROOT_PASSWORD,
});

//mongoose.connect(`mongodb://${process.env.MONGO_INITDB_ROOT_USERNAME}:${process.env.MONGO_INITDB_ROOT_PASSWORD}@mongo:27017`);