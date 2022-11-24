const HotelDB = require('../models/hotelModel');

async function getHotels(request, response) {
    try {
      const hotels = await HotelDB.find({}).sort({ hotelName: 1 });
  
      response.status(200).json(hotels);
    } catch (error) {
      response.status(400).json({ error: error.message });
    }
  }