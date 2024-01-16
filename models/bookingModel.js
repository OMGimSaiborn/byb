const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({


    room : {type : mongoose.Schema.Types.ObjectID,ref:'lodgings'},
    user : {type : mongoose.Schema.Types.ObjectID,ref:'users'},
    bookedTimeSlots: {
        from : {type : String},
        to : {type : String}
      },
    totalNights : {type : Number},
    totalAmount : {type : Number},
    revenue     : {type : Number},
    transactionId : {type : String},
    foodService : {type : Boolean}

},
{timestamps : true}
)

const bookingModel = mongoose.model('bookings', bookingSchema)

module.exports = bookingModel