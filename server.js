// app.js
require('dotenv').config();
const app = require('./config/app')
const connectDb = require('./config/db');

const PORT = 8000;


const startServer = async () => {
  try {
    await connectDb(process.env.MONGO_URI);
    app.listen(PORT, () => {
      console.log(`Server started on http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error('Error connecting to the database:', err.message);
  }
};

startServer();


