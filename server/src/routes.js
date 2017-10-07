const express = require('express');

const router = express.Router();

// Import Controllers
import EchoController from './controllers/EchoController';

// test api
router.get('/v1/ping', (req, res) => res.json('pong'));

// echo the value provided
router.post('/v1/echo', EchoController.echo);

module.exports = router;
