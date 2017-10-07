const express = require('express');

const router = express.Router();

// Import Controllers
import EchoController from './controllers/EchoController';
import ControlController from './controllers/ControlController';

// test api
router.get('/v1/ping', (req, res) => res.json('pong'));

// echo routes
router.post('/v1/echo', EchoController.echo);

// control routes
router.post('/v1/control', ControlController.TakePath);

module.exports = router;
