
const express = require('express');
const path = require('path');
const cors = require('cors')

const errorHandler = require('../middleware/error.handler.middleware');

const app = express();
app.use(express.json())
app.use(cors());

app.use(express.static(path.join(__dirname, '../frontend')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/register.html'));
});

app.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/login.html'));
});

app.get('/getAll', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/fetchUser.html'));
});

const userRouter = require('../routes/userRoutes')

app.use('/users', userRouter); //it is used to update and delete
app.use(errorHandler);



module.exports=app


