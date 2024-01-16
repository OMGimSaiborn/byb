const express = require('express');
const router = express.Router();
const Room = require('../models/roomModel');

router.get('/getallrooms', async (req, res) => {
  try {
    const lodgings = await Room.find();
    res.json(lodgings);
  } catch (error) {
    console.error('Error al obtener las habitaciones', error);
    res.status(400).json({ error: 'Error al obtener las habitaciones' });
  }
});

router.post('/addroom', async (req, res) => {
  try {
    const newRoom = new Room(req.body);
    await newRoom.save();
    res.send('Room added successfully');
  } catch (error) {
    console.error('Error al agregar una habitacion', error);
    res.status(400).json({ error: 'Error al agregar una habitacion' });
  }
});


router.post('/editroom', async (req, res) => {
  try {
    const room = await Room.findById(req.body._id);
    
    if (!room) {
      return res.status(404).json({ error: 'Room not found' });
    }

    room.name = req.body.name;
    room.image_url = req.body.image_url;
    room.rentPerNight = req.body.rentPerNight;
    room.services = req.body.services;
    room.capacity = req.body.capacity;
    room.security = req.body.security;
    room.locate = req.body.locate;
    room.description = req.body.description;
    room.security = req.body.security;

    await room.save();

    res.send('Room details edited successfully');
  } catch (error) {
    console.error('Error al editar la habitacion', error);
    res.status(400).json({ error: 'Error al editar la habitacion' });
  }
});

router.post('/deleteroom', async (req, res) => {
  try {
    await Room.findOneAndDelete( {_id : req.body.roomid})
    

    res.send('Room deleted successfully');
  } catch (error) {
    console.error('Error al editar las habitaciones', error);
    res.status(400).json({ error: 'Error al editar la habitacion' });
  }
});

router.post('/rateroom', async (req, res) => {
  try {
    const { roomId, rating } = req.body;
    const room = await Room.findById(roomId);
    if (!room) {
      return res.status(404).json({ message: 'Room not found' });
    }
    room.rate = rating;
    await room.save();
    res.json({ message: 'Room rating updated' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Failed to rate room' });
  }
});

module.exports = router;
