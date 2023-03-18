const mongoose = require('mongoose');
require('dotenv').config();

mongoose.set('strictQuery', false);

dbURI = 'mongodb://127.0.0.1:27017/hackatonDB';
//dbURI = 'mongodb://temp:user@localhost:27017/?authSource=hackatonDB'
//dbURI = `mongodb://${process.env.MONGO_INITDB_ROOT_USERNAME}:${process.env.MONGO_INITDB_ROOT_PASSWORD}@mongo27017/hackatonDB`;

mongoose.connect(dbURI, {
    useNewUrlParser: true,
    maxPoolSize: 50,
    useUnifiedTopology: true,
    family: 4,
    //user: 'temp',
    //pass: 'user',
});

//mongoose.connect(`mongodb://${process.env.MONGO_INITDB_ROOT_USERNAME}:${process.env.MONGO_INITDB_ROOT_PASSWORD}@mongo:27017`);