const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const JWT_SECRET = 'ghosalbiswajit11';

const User = require('../models/User')
const fetchuser = require('../middleware/fetchuser')

//creating an user using : POST "/api/auth/createuser". Doesn't require login

router.post('/createuser', [
    body('name', 'Enter Valid Name').isLength({ min: 3 }),
    body('email', 'Enter Valid Email').isEmail(),
    body('password', 'Password must be 5 characters').isLength({ min: 5 })
], async (req, res) => {
    let success = false;
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
        success = true;
        res.json({ success, authToken })
    }
    catch (err) {
        console.log(err)
    }
})
//Authenticating an user using : POST "/api/auth/login". Doesn't require login

router.post('/login', [
    body('email', 'Enter Valid Email').isEmail(),
    body('password', 'Password cannot be blank').exists()
], async (req, res) => {
    const errors = validationResult(req);
    let success = false;
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }
    const email = req.body.email;
    const password = req.body.password;
    try {
        let user = await User.findOne({ email });
        if (!user) {
            success = false;
            return res.status(400).json({ error: "Please try to login with correct credentials" })
        }
        const passwordCompare = await bcrypt.compare(password, user.password);
        if (!passwordCompare) {
            success = false;
            return res.status(400).json({ error: "Please try to login with correct credentials" })
        }
        const authToken = jwt.sign({ user: user._id }, JWT_SECRET);
        success = true;
        res.json({ success, authToken })

    } catch (error) {
        res.status(500).send("Internal Server Error")
    }
})

//Route 3: Get loggedin User Details using: POST "/api/auth/getuser". Login required
router.post('/getuser', fetchuser, async (req, res) => {
    try {
        const userId = req.user;
        const user = await User.findById(userId).select("-password")
        res.send(user)
    } catch (error) {
        res.status(500).send("Internal Server Error")
    }
})
module.exports = router;