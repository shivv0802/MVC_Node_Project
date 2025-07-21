// app.js
const express = require('express');

const connectDb = require('./config/db');

const PORT = 8000;

const userRoutes = require('./routes/userRoutes');

const app = express();

app.use(express.json());


app.get('/', (req, res) => {
  res.send('Hello');
});

app.use('/users', userRoutes);


const startServer = async () => {
  try {
    await connectDb('mongodb://localhost:27017/myappdb');
    app.listen(PORT, () => {
      console.log(`Server started on http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error('Error connecting to the database:', err.message);
  }
};

startServer();

module.exports = app;
