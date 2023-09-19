const express = require('express');
const { body } = require('express-validator');
const router = express.Router();

router.get('/addnote', [
    body('title', 'Enter Valid Title').isLength({ min: 3 }),
    body('description', 'Description must be 5 characters').isLength({ min: 5 }),
], (req, res) => {
    res.json({
        Response: 'Hello World! Have a nice day!'
    });
});

module.exports = router;