const mongoose = require('mongoose');
import dotenv from 'dotenv';

mongoose
  .connect(
    'mongodb+srv://ofogbageorge3:alWLVWrWgltxd5VJ@cluster0.cdl1o.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'
  )
  .then(() => console.log('Database connected'))
  .catch((error) => console.log(error));
