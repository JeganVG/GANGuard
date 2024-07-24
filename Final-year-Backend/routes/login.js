
const express = require('express');
const cookieParser=require("cookie-parser")
const User=require("../models/user")
const   mongoose = require('mongoose'),
router = express.Router();
const bcrypt=require('bcrypt');
const jwt=require("jsonwebtoken");
// Sign Up Route
router.post('/signup', async (req, res) => {
    try {
      const {name, email, password } = req.body.state;
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = new User({ name,email, password: hashedPassword });
      await user.save();
      return res.json({ message: 'User created successfully' });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'An error occurred.' });
    }
  });
  
  // Log In Route
  router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
  
    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }
  
    const isValidPassword = await bcrypt.compare(password, user.password);
  
    if (!isValidPassword) {
      return res.status(401).json({ message: 'Invalid password.' });
    }
  
    const token = jwt.sign({ email: user.email,role:user.role }, 'jwt-secret-key', { expiresIn: '1h' });
    res.cookie('token',token);
    return res.json({Status:"Success",role:user.role,token:token,message:"Login successful" });
  });
  


  module.exports = router;
