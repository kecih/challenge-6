// Set Up Connection To Mongodb
const mongoose = require('mongoose');
const mongoDB = 'mongodb://localhost/bs_admin';

mongoose.connect(
    mongoDB, {
        useUnifiedTopology: true,
        useNewUrlParser: true
    }
).then(() => console.log('Mongodb Connected'))

mongoose.Promise = global.Promise;
module.exports = mongoose;