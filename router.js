const mongoose = require('mongoose'); 
const express = require('express');
const expressValidator = require('express-validator'); 
const bcrypt = require('bcrypt');
require('dotenv').config();
const jwt = require('jsonwebtoken'); 
const User = require("./user"); 
const router = express.Router(); 

router.post('/user', async (req, res) => {
  try {
    const { name, username, email, password } = req.body;
    const { body, validationResult } = require('express-validator');

await body('name').notEmpty().run(req);
await body('username').notEmpty().run(req);
await body('email').isEmail().run(req);
await body('password').isLength({ min: 8 }).run(req);

const errors = validationResult(req);
if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
}
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const newUser = new User({ // Changed from user to newUser
      name,
      username,
      email,
      password: hashedPassword,
    });
    await newUser.save();
    res.status(201).json({ 
      user: {
        id: newUser._id,
        name: newUser.name,
        username: newUser.username,
        email: newUser.email,
      },
      message: "User registered successfully"
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error', error: error.message }); 
  }
});
/////////
////////////s
router.post('/user/login', async (req, res) => {
    try {
        await body('username').notEmpty().run(req);
        await body('password').isLength({ min: 8 }).run(req);

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(400).json({ errors: errors.array() });
        }
        const { username, password } = req.body;

        const user = await User.findOne({ username });

        if (!user) {
            return res.status(401).json({ error: 'Invalid username' });
        }
        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) {
            return res.status(401).json({ error: 'Invalid password' });
        }
        // Generate JWT token securely
        const token = jwt.sign(
            { userId: user._id, name: user.name, email: user.email },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
        );
        res.json({ message: "Login successful", token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
});
  //
  
  

module.exports = router;
