const HotelDB = require('../models/hotelModel');
const uploadImage = require('../utils/uploadImage')

async function getHotels(request, response) {
  const { name, address } = request.query;
  try {
    const hotels = await HotelDB.find({
      hotelName: { $regex: name, $options: 'i' },
      address: { $regex: address, $options: 'i' },
    })
      .collation({ locale: 'en', strength: 2 })
      .sort({ hotelName: 1 });

    console.log(hotels);
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

  async function editHotelDetails(request, response) {
    const { hotelName, address, text, hotelId } = request.body;
  
    const updateInfo = { hotelName, address, text };
  
    try {
      const newHotel = await HotelDB.findOneAndUpdate({ _id: hotelId }, updateInfo, {
        returnOriginal: false,
      });
  
      response.status(200).json(newHotel);
    } catch (error) {
      response.status(400).json({ error: error.message });
    }
  }


  module.exports = {
    getHotels,
    getHotelByHotelId,
    createHotel,
    editHotelDetails
  }