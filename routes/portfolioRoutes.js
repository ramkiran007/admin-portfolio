const express = require('express');
const Portfolio = require('../models/portfolio_model'); // Adjust the path as necessary
const jwt = require('jsonwebtoken');
const multer = require('multer');
const router = express.Router();
const jwtSecret = process.env.JWT_SECRET;
const fs = require('fs');
const path = require('path');
const { google } = require('googleapis');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
require('dotenv').config();


const emailUser = process.env.EMAIL_USER;
//const emailPass = process.env.EMAIL_PASS;

const oauth2Client = new google.auth.OAuth2(
    process.env.CLIENT_ID, // Your Client ID
    process.env.CLIENT_SECRET, // Your Client Secret
    "https://developers.google.com/oauthplayground" // Redirect URL
  );

oauth2Client.setCredentials({
    refresh_token: process.env.REFRESH_TOKEN // Your Refresh Token
  });

  async function sendEmail(req, res) {
    try {
      const accessToken = await oauth2Client.getAccessToken();
  
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          type: 'OAuth2',
          user: process.env.EMAIL_USER, // Your Gmail address
          clientId: process.env.CLIENT_ID,
          clientSecret: process.env.CLIENT_SECRET,
          refreshToken: process.env.REFRESH_TOKEN,
          accessToken: accessToken, // Note: use accessToken.token for the actual token value
          
        },
      });
  console.log("token bc"+accessToken)
      const mailOptions = {
        from: req.body.email,
        to: process.env.EMAIL_USER, // Where you want to receive the emails
        subject: `New message from ${req.body.name}`,
        text: req.body.message,
      };
  
      const result = await transporter.sendMail(mailOptions);
      console.log('Email sent:', result);
      res.status(200).send('Email sent successfully');
    } catch (error) {
      console.error('Error sending email:', error);
      res.status(500).send('Error sending email');
    }
  }
  
// Configure multer for file uploads
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        return cb(null, './uploads');
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        return cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
    }
});
const upload = multer({ storage: storage })

// Configure Multer to handle multiple file types (image and resume)
const fileFields = upload.fields([
  { name: 'image', maxCount: 1 },
  { name: 'resume', maxCount: 1 }
]);

// Middleware to authenticate using JWT
function authenticate(req, res, next) {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1];

  if (token == null) return res.sendStatus(401); // If there's no token

  jwt.verify(token, jwtSecret, (err, user) => {
    if (err) return res.sendStatus(403); // If the token is invalid
    req.user = user;
    next(); // Proceed to the next middleware
  });
}


router.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});
router.get('/items', async (req, res) => {
    try {
      const items = await Portfolio.find();
      console.log('Sending Portfolio Items:', items); // Add this line to log items before sending

      res.json(items);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching portfolio items', error });
    }
  });
  router.post('/send-email', sendEmail )
    

// Add a new portfolio item with optional image and resume upload
router.post('/add', fileFields, async (req, res) => {
    try {
       
    const newItem = new Portfolio({
       ...req.body,
        image: req.files&&req.files['image'] ? req.files['image'][0].path : null,
        resume: req.files&&req.files['resume'] ? req.files['resume'][0].path : null,
    });
    console.log('Files:', req.files);
    console.log('Body:', req.body);
   
        await newItem.save();
        res.status(201).json({ message: "Item added successfully", imagePath: newItem.image });
    } catch (error) {
        console.error('Error adding portfolio item:', error);
        res.status(500).json({ message: 'Error adding portfolio item', error: error.message });
    }
});


// Update a portfolio item
router.put('/update/:id', fileFields, async (req, res) => {
    const { id } = req.params;
    const updateData = {
        ...req.body,
        image: req.files && req.files['image'] ? req.files['image'][0].path : null,
        resume: req.files && req.files['resume'] ? req.files['resume'][0].path : null,
    };

    try {
        const updatedItem = await Portfolio.findByIdAndUpdate(id, updateData, { new: true });
        console.log('Portfolio item updated successfully:', updatedItem);
        res.json(updatedItem);
    } catch (error) {
        console.error('Error updating portfolio item:', error);
        res.status(500).json({ message: 'Error updating portfolio item', error });
    }
});
router.post('/remove-image', async (req, res) => {
    const { imagePath } = req.body; // Get the image path from the request
    if (!imagePath) return res.status(400).json({ message: 'No image path provided' });

    try {
        const filePath = path.join(__dirname, '..', imagePath);
        fs.unlink(filePath, err => {
            if (err) {
                console.error('Failed to delete image file:', err);
                return res.status(500).json({ message: 'Failed to delete image file' });
            }
            // Optionally, remove any database entry associated with this image if necessary
            res.json({ message: 'Profile image removed successfully' });
        });
    } catch (error) {
        console.error('Error removing profile image:', error);
        res.status(500).json({ message: 'Error removing profile image', error: error.message });
    }
});

// Delete a portfolio item
router.delete('/remove/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const item = await Portfolio.findById(id);
        if (item && item.image) {
            // Construct the file path
            const filePath = path.join(__dirname, '..', 'uploads', path.basename(item.image));
            // Delete the file from the filesystem
            fs.unlink(filePath, (err) => {
                if (err) {
                    console.error('Failed to delete image file:', err);
                    // Optionally, send a response indicating failure to delete the file
                } else {
                    console.log('Image file deleted successfully');
                }
            });
        }

        // Now, delete the item from the database
        await Portfolio.findByIdAndDelete(id);
        res.json({ message: 'Item and image deleted successfully' });
    } catch (error) {
        console.error('Error deleting portfolio item:', error);
        res.status(500).json({ message: 'Error deleting portfolio item', error });
    }
});

module.exports = router;
