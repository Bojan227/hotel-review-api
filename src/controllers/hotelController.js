const HotelDB = require('../models/hotelModel');

async function getHotels(request, response) {
    try {
      const hotels = await HotelDB.find({}).sort({ hotelName: 1 });
  
      response.status(200).json(hotels);
    } catch (error) {
      response.status(400).json({ error: error.message });
    }
  }


  async function getHotelByHotelId(request, response) {
    console.log(request.params);
    const { hotelId } = request.params;
  
    try {
      const hotel = await HotelDB.find({ _id: hotelId });
  
      response.status(200).json(hotel);
    } catch (error) {
      response.status(400).json({ error: error.message });
    }
  }

  module.exports = {
    getHotels,
    getHotelByHotelId
  }