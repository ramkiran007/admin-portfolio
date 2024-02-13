const express = require('express');
const Portfolio = require('../models/portfolio_model'); // Adjust the path as necessary
const multer = require('multer');
const router = express.Router();
const fs = require('fs');
const path = require('path');
require('dotenv').config();





 
  
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

router.get('/', (req, res) => {
  const filePath = path.join(__dirname, '../..', 'build/index.html');
  res.sendFile(filePath);
});

console.log(path.join(__dirname, '../..', 'build/index.html'))
router.get('/items', async (req, res) => {
    try {
      const items = await Portfolio.find();
      console.log('Sending Portfolio Items:', items); // Add this line to log items before sending

      res.json(items);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching portfolio items', error });
    }
  });
    

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
