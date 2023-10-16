const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config()

const userRoutes = require('./routes/userRoutes');

const app = express();


const port = process.env.PORT || 8081;

app.use(express.json());

app.use(userRoutes);

app.get('/', function (req, res) {
    res.send('This is StudentSync backend');
});

//Connect to datatbase
mongoose.set('strictQuery', false);
const connectDB = async()=> {
  try{
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB uis connected ${conn.connection.host}`);
  }catch(error){
    console.log(error);
    process.exit(1);
  }
}

connectDB().then(() => {
  app.listen(port, () => {
    console.log(`Server is up on port ${port}`);
  });
})
