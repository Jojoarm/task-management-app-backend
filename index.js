const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log('connected to db');
  })
  .catch((err) => {
    console.log(err.message);
  });

const app = express();

// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

app.use('/api', (req, res) => {
  res.status(200).json({ message: 'hello Express' });
});

app.listen(5000, () => console.log('Server running on port 5000'));
