let mongoose = require('mongoose');
let config = require('./config');

mongoose.connect(`mongodb://127.0.0.1:27017/${config.DB}`)

let db = mongoose.connection;

db.on('error', err => {
    Error(err.toString());
})

db.once('open', () => {
    console.log('mongodb 连接成功')
})