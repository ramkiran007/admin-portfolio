const mongoose = require('mongoose');
const { Schema } = mongoose;

const portfolioSchema = new Schema({
  type: { type: String, enum: ['projects', 'workExperiences', 'about','image', 'resume'] },
  title: { type: String },
  description: { type: String },
  image:  { type: String } , // URL to an image
  resume: { type: String } // URL to a resume, relevant if type is 'resume'
}, { timestamps: true });

module.exports = mongoose.model('Portfolio', portfolioSchema);
