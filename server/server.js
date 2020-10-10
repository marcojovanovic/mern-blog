const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');

//routes

const postRoutes = require('./routes/post')

require('dotenv').config();

const app = express();

mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(() => console.log('connected'))
  .catch((err) => console.log(err));

// middlewares

app.use(cors());
app.use(morgan('dev'));
app.use(bodyParser.json());

// route mieddladfd

app.use('/api/', postRoutes)



const port = process.env.Port || 8000;

app.listen(port, () => {
  console.log(`app working on ${port}`);
});
