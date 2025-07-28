
const express = require('express');



const app = express();
app.use(express.json())

const userRouter = require('../routes/userRoutes')

app.use('/users', userRouter); //it is used to update and delete



app.get('/', (req, res) => {
  res.end('<h1>hey from server</h1>');
});

module.exports=app


