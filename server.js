const express = require('express');
const User = require('./models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const path = require('path');

const session = require('express-session');
const ObjectId = require('mongodb').ObjectId; // Add this line for ObjectId
const Portfolio=require('./models/portfolio_model')
const portfolioRoutes = require('./routes/portfolioRoutes'); // Adjust path as necessary
require('dotenv').config();


const app = express();
app.use(express.json());
const cors = require('cors');
const jwtSecret = process.env.JWT_SECRET;



// Set up the session middleware
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: 'auto' } // Set this to true if you're using HTTPS
}));
app.use('/api/portfolio', portfolioRoutes);
app.use('/uploads', express.static('uploads'));
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

  /*

  app.post('/api/admin/login', async (req, res) => {
    const { username, password } = req.body;

    const user = await User.findOne({ username });

    if (!user) {
        return res.status(401).json({ success: false, message: 'User not found!' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    
    console.log('Entered password:', password);
    console.log('Hashed password from DB:', user.password);
    console.log('Is password valid:', isPasswordValid);
    bcrypt.compare(password, user.password, function(err, result) {
        if (err) {
            console.error("Error while comparing:", err);
        } else {
            console.log("Comparison result:", result);
        }
    });

    if (isPasswordValid) {
        const token = jwt.sign({ id: user._id, username: user.username }, 'your_jwt_secret', { expiresIn: '1h' });
        return res.json({ success: true, token: token });
    } else {
        return res.status(401).json({ success: false, message: 'Invalid login credentials' });
    }
});





app.post('/api/admin/register', async (req, res) => {
    const { username, password } = req.body;

    // Check if the user already exists
    const existingUser = await User.findOne({ username });
    if (existingUser) {
        return res.status(400).json({ success: false, message: 'Username already exists.' });
    }

    const user = new User({
        username: username,
        password: password // Just save the password directly. Middleware will take care of hashing.
    });

    try {
        await user.save();
        res.json({ success: true });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error.' });
    }
});




// Example protected route
app.get('/api/protected', authenticate, (req, res) => {
  res.send('This is a protected route.');
});
*/
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});
const PORT = process.env.PORT || 3005; // Default to 3000 if PORT is not defined
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});