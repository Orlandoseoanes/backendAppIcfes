const mongoose = require('mongoose');

const URI = 'mongodb://178.16.143.56:27017/icfes';

mongoose.connect(URI, {
useUnifiedTopology: true,
useNewUrlParser: true,
})
.then(db => console.log('DB is connected'))
.catch(err => console.error(err));