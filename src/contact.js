import React, { useState } from 'react';
import { Card, CardContent, CardActions, TextField, Button, Typography } from '@mui/material';
import { motion } from 'framer-motion';
import toast, { Toaster } from 'react-hot-toast';
import emailjs from 'emailjs-com';


function ContactForm() {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    emailjs.sendForm('service_6nb5y7k', 'template_onh8f6d', e.target, 'SU6nCk5HhD4KP8XXd')
      .then((result) => {
          console.log(result.text);
          toast.success('Message sent successfully');
          // Reset form here if necessary
          setFormState({ name: '', email: '', message: '' });
      }, (error) => {
          console.log(error.text);
          toast.error('Failed to send the message');
      });
};

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
              <Toaster position="top-center" reverseOrder={false} />

      <Card sx={{ maxWidth: 600, mx: 'auto', mt: 5, padding: 3, backgroundColor: '#404647', color: '#fff' }}>
        <CardContent>
          <Typography variant="h5" component="div" gutterBottom sx={{ color: 'white', textAlign: 'center' }}>
            Get in Touch
          </Typography>
          <form onSubmit={handleSubmit} noValidate autoComplete="off">
            <TextField
              label="Your Name"
              variant="filled"
              fullWidth
              margin="normal"
              name="name"
              value={formState.name}
              onChange={handleChange}
              sx={{ input: { color: '#fff' }, '& .MuiFilledInput-underline:after': { borderBottomColor: '#7c4dff' }, '& .MuiInputLabel-root': { color: '#aaa' } }}
            />
            <TextField
              label="Your Email"
              variant="filled"
              fullWidth
              margin="normal"
              name="email"
              value={formState.email}
              onChange={handleChange}
              sx={{ input: { color: '#fff' }, '& .MuiFilledInput-underline:after': { borderBottomColor: '#7c4dff' }, '& .MuiInputLabel-root': { color: '#aaa' } }}
            />
            <TextField
  label="Your Message"
  variant="filled"
  fullWidth
  margin="normal"
  name="message"
  value={formState.message}
  onChange={handleChange}
  multiline
  rows={4}
  sx={{
    '& .MuiFilledInput-input': {
      color: '#fff', // This directly changes the text color inside the input
    },
    '& .MuiFilledInput-underline:after': {
      borderBottomColor: '#7c4dff',
    },
    '& .MuiInputLabel-root': {
      color: '#aaa', // Label color
    },
    '& .MuiInputLabel-root.Mui-focused': {
      color: '#7c4dff', // Label color when the input is focused
    },
    '& .MuiFilledInput-root': {
      backgroundColor: 'rgba(255, 255, 255, 0.15)', // Adjust as needed for the filled background
      '&:hover': {
        backgroundColor: 'rgba(255, 255, 255, 0.25)', // Adjust hover background color as needed
      },
      '&.Mui-focused': {
        backgroundColor: 'rgba(255, 255, 255, 0.25)', // Adjust focused background color as needed
      },
    },
  }}
/>

            <CardActions sx={{ justifyContent: 'center', mt: 2 }}>
              <Button type="submit" variant="contained" color="primary" sx={{ textTransform: 'none' }}>
                Send 
              </Button>
            </CardActions>
          </form>
        </CardContent>
      </Card>
    </motion.div>
  );
}

export default ContactForm;
