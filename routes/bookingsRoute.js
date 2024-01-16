const express = require('express');
const Booking = require('../models/bookingModel');
const Room = require('../models/roomModel')
const router = express.Router();

router.post("/bookroom", async (req, res) => {
    req.body.transactionId = '1234';
    try {
        const newBooking = new Booking(req.body); // Fix the variable name here
        newBooking.revenue = req.body.totalAmount;
        await newBooking.save(); // Fix the variable name here

        const room = await Room.findOne({ _id: req.body.room });
        room.bookedTimeSlots.push(req.body.bookedTimeSlots);
        await room.save();

        res.send('Your booking is successful');
    } catch (error) {
        console.log(error);
        return res.status(400).json(error);
    }
});

router.get('/getallbookings', async (req, res) => {
    try {
        const bookings = await Booking.find().populate('room');
        res.send(bookings);
    } catch (error) {
        return res.status(400).json(error);
    }
});

module.exports = router;