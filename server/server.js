const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const fs = require('fs');




const Portfolio=require('./models/portfolio_model')
const portfolioRoutes = require('./routes/portfolioRoutes'); // Adjust path as necessary


const app = express();
app.use(express.json());
const cors = require('cors');
require('dotenv').config();




app.use('/api/portfolio', portfolioRoutes);
const uploadDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDir)){
  fs.mkdirSync(uploadDir);
}

app.use('/uploads', express.static(uploadDir));

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));


app.use(cors({
  origin: ['*'], // or use '*' to allow all origins
methods:["POST","GET"],

credentials: true}));
const mongourl =process.env.MONGODB_URI;
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
const port = process.env.PORT ||8080
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});


