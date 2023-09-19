const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const JWT_SECRET = 'ghosalbiswajit11';

const User = require('../models/User')

//creating an user using : POST "/api/auth". Doesn't require auth

router.post('/createuser', [
    body('name', 'Enter Valid Name').isLength({ min: 3 }),
    body('email', 'Enter Valid Email').isEmail(),
    body('password', 'Password must be 5 characters').isLength({ min: 5 })
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }
    try {
        //check whether the user with this email exists already
        let user = await User.findOne({ email: req.body.email })
        if (user) {
            res.status(400).json({ error: "Sorry a user with this email already exists" })
        }
        securePassword = await bcrypt.hash(req.body.password, 10)
        //create new user and save to database
        user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: securePassword
        });
        const authToken = jwt.sign({ user: user._id }, JWT_SECRET)
        res.json({ authToken })
    }
    catch (err) {
        console.log(err)
    }
})
module.exports = router;