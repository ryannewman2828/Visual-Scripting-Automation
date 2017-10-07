import StorageService from '../services/EchoService';
import winston from 'winston';

const StorageController = {};

StorageController.Eval = (req, res, next) => {
    const {input} = req.body;

    if (!input) {
        winston.log('error', 'No Input was provided');
        return res.status(400).json({ message: 'No Input was provided' });
    }

    return StorageService.Eval(input)
        .then(value => res.json({ output: value }))
        .catch(next);
};

export default StorageController;
