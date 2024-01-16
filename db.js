const mongoose = require('mongoose');

function connectDB() {
  mongoose.connect('mongodb://127.0.0.1:27017/b&b', {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });

  mongoose.connection.on('error', function (err) {
    console.log('Error de conexión: ' + err);
  });

  mongoose.connection.on('connected', function () {
    console.log('Conexión exitosa');
  });
}

connectDB();