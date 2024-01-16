const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
const dbConnection = require('./db');
const roomsRoute = require('./routes/roomsRoute');
const usersRoute = require('./routes/usersRoute');
const bookingsRoute = require('./routes/bookingsRoute');
app.use(express.json())

app.use('/api/rooms/', roomsRoute);
app.use('/api/users/', usersRoute);
app.use('/api/bookings/', bookingsRoute);
app.get('/',(req , res) => res.send('Hello World'))
app.listen(port, () => console.log(`Node JS connected PORT ${port}!`));