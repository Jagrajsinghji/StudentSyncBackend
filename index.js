const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config()

const institutionRoutes = require('./routes/institutionRoutes');
const skillsRoutes = require('./routes/skillRoutes');
const emailRoutes = require('./routes/emailRoutes');
const userdetailsRoutes = require('./routes/userdetailsRoutes');
const userownskillsRoutes = require('./routes/userownskillsRoutes');
const userwantskillsRoutes = require('./routes/userwantskillsRoutes');

const app = express();


const port = process.env.PORT || 8088;

app.use(express.json());

app.use(institutionRoutes);
app.use(skillsRoutes);
app.use(emailRoutes);
app.use(userdetailsRoutes);
app.use(userownskillsRoutes);
app.use(userwantskillsRoutes);

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
