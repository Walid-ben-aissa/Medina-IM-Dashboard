require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors'); // Import cors package
const dataRoutes = require('./routes/dataRoutes');
const userRoutes = require('./routes/userRoutes');

const app = express();
app.use(express.json());

// Use cors middleware
app.use(cors());

mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

app.use('/api/users', userRoutes);
app.use('/api/data', dataRoutes);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server running on port ${port}`));
