const mongoose = require("mongoose");

const lodgingSchema = new mongoose.Schema({
  name: { type: String, required: true },
  locate: { type: String, required: true },
  services: { type: String, required: true },
  security: { type: String, required: true },
  description: { type: String, required: true },
  image_url: { type: String, required: true },
  bookedTimeSlots:
    [{
      from: { type: String, required: true },
      to: { type: String, required: true }
    }],
  rentPerNight: { type: Number, required: true },
  capacity: { type: Number, required: true },
  rate: { type: Number, default: 0 },
}, { timestamps: true });

const lodgingModel = mongoose.model('lodgings', lodgingSchema);
module.exports = lodgingModel;
