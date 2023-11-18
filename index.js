const express = require('express');
const http = require('http');
const mongoose = require('mongoose');
require('dotenv').config()

const institutionRoutes = require('./routes/institutionRoutes');
const skillsRoutes = require('./routes/skillRoutes');
const emailRoutes = require('./routes/emailRoutes');
const userdetailsRoutes = require('./routes/userdetailsRoutes');
const userownskillsRoutes = require('./routes/userownskillsRoutes');
const userwantskillsRoutes = require('./routes/userwantskillsRoutes');
const reviewsRoutes = require('./routes/reviewsRoutes');
const postRoutes = require('./routes/postRoutes');
const postlikehistoryRoutes = require('./routes/postlikehistoryRoutes');
const notificationRoutes = require('./routes/notificationRoutes');

const app = express();
const myhttp = http.createServer(app);

const port = process.env.PORT || 8089;

app.use(express.json());

app.use(institutionRoutes);
app.use(skillsRoutes);
app.use(emailRoutes);
app.use(userdetailsRoutes);
app.use(userownskillsRoutes);
app.use(userwantskillsRoutes);
app.use(reviewsRoutes);
app.use(postRoutes);
app.use(postlikehistoryRoutes);
app.use(notificationRoutes);

app.get('/', function (req, res) {
    res.send('This is StudentSync backend');
});

//Socket Logic
const socketio = require('socket.io')(myhttp);

socketio.on("connection", (userSocket) => {
    //Listen to any event
    userSocket.on("send_message", (data) => {
        //Send message to all sockets
        userSocket.broadcast.emit("receive_message", data)
    })
})

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
  myhttp.listen(port, () => {
    console.log(`Server is up on port ${port}`);
  });
})
