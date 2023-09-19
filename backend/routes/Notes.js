const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.json({
        Response: 'Hello World! Have a nice day!'
    });
});

module.exports = router;