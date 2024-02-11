const express = require('express');
const User = require('./models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const path = require('path');
const fs = require('fs');

const session = require('express-session');
const ObjectId = require('mongodb').ObjectId; // Add this line for ObjectId
const Portfolio=require('./models/portfolio_model')
const portfolioRoutes = require('./routes/portfolioRoutes'); // Adjust path as necessary
require('dotenv').config();


const app = express();
app.use(express.json());
const cors = require('cors');
const jwtSecret = process.env.JWT_SECRET;




app.use('/api/portfolio', portfolioRoutes);
const uploadDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDir)){
  fs.mkdirSync(uploadDir);
}

app.use('/uploads', express.static(uploadDir));

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

const corsOptions = {
  origin: 'http://localhost:3000', // or use '*' to allow all origins

  
  credentials: true, // to support cookies passing through CORS
};

app.use(cors());
const mongourl =
"mongodb+srv://cca-medurir2:Ramkiran888@cca-medurir2.kwaur2w.mongodb.net/cca-project-sprint2?retryWrites=true&w=majority";

mongoose
  .connect(mongourl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to the MongoDB cluster");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err);
  });

  
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});
const PORT = process.env.PORT || 3005; // Default to 3000 if PORT is not defined
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});