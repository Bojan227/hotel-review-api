// require dotenv file
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const cors = require('cors')

app.use(cors())
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

// import routes
const userRoutes = require('./routes/userRoutes');
const reviewRoutes = require('./routes/reviewRoutes');
const hotelRoutes = require('./routes/hotelRoutes');
// use routes
app.use('/user', userRoutes);
app.use('/review', reviewRoutes);
app.use('/hotel', hotelRoutes);

mongoose.connect(process.env.MONGO_URI).then(() => {
  app.listen(3000, () => {
    console.log(`Listening on port ${process.env.PORT}`);
  });
  console.log('Connected to DB');
});
