const express = require('express');

const router = express.Router();

/* GET home page. */
router.get('/ping', (req, res) => res.json('pong'));

module.exports = router;
