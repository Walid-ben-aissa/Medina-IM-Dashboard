const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const authenticate = require('../middleware/authenticate');

const router = express.Router();


// Register a new user
router.post('/register', async (req, res) => {
    try {
        const { username, password } = req.body;
        let user = await User.findOne({ username });
        if (user) {
            return res.status(400).send('User already exists');
        }
        user = new User({ username, password });
        await user.save();
        res.status(201).send('User registered');
    } catch (error) {
        res.status(500).send(error.message);
    }
});

// User login
router.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username });
        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(401).send('Authentication failed');
        }
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.send({ token });
    } catch (error) {
        res.status(500).send(error.message);
    }
});

// Get user profile by token
router.get('/profile', authenticate, async (req, res) => {
    try {
        const user = await User.findById(req.user.id
        );
        res.send(user);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

// Access secured route
router.get('/secure', authenticate, (req, res) => {
    res.send('You have accessed a secure route');
});

module.exports = router;
