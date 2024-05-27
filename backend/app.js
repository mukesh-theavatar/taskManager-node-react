require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

//Middleware
app.use(cors());
app.use(bodyParser.json());

// MongoDB Atlas connection
const mongoURI = process.env.MONGO_URI || 'mongodb://localhost:27017/tasks';

mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
    .then(() => console.log('MongoDB connected to Atlas'))
    .catch(err => console.log(err.message));

//Routes
app.use('/api/tasks', require('./routes/tasks'));

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));