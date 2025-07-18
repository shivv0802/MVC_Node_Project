
const app = require('./app');
const connectDb = require('./config/db');

const PORT = 8000;

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
