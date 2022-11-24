// require dotenv file
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const app = express();

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

// import routes
const userRoutes = require('./routes/userRoutes');
const reviewRoutes = require('./routes/reviewRoutes')

app.use('/user', userRoutes);

mongoose.connect(process.env.MONGO_URI).then(() => {
  app.listen(3000, () => {
    console.log(`Listening on port ${process.env.PORT}`);
  });
  console.log('Connected to DB');
});
