const HotelDB = require('../models/hotelModel');
const uploadImage = require('../utils/uploadImage')

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

  async function createHotel(request, response) {
    const { hotelName, address, text, image } = request.body;
  
    try {
      const { imageUrl, imageId } = await uploadImage(image);
  
      const hotel = await HotelDB.create({
        hotelName,
        address,
        imageId,
        imageUrl,
        text,
      });
  
      response.status(200).json(hotel);
    } catch (error) {
      response.status(400).json({ error: error.message });
    }
  }


  module.exports = {
    getHotels,
    getHotelByHotelId,
    createHotel
  }