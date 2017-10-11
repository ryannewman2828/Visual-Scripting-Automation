const express = require('express');

const router = express.Router();

// Import Basic Functionality Controllers
import EchoController from './controllers/EchoController';
import ControlController from './controllers/ControlController';
import StorageController from './controllers/StorageController';
import ScriptController from './controllers/ScriptController';

// Import API Tile Controllers
import GithubController from './controllers/GithubController';

// test api
router.get('/v1/ping', (req, res) => res.json('pong'));

// Echo routes
router.post('/v1/echo', EchoController.echo);

// Control routes
router.post('/v1/control', ControlController.TakePath);

// Storage routes
router.post('/v1/eval', StorageController.Eval);

// Github Tile Routes
router.post('/v1/github/users', GithubController.GetRepos);

// Script Routes
router.post('/v1/script/execute', ScriptController.Execute);

module.exports = router;
