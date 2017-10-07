import ControlService from '../services/ControlService';
import winston from 'winston';

const ControlController = {};

ControlController.TakePath = (req, res, next) => {
    const { input } = req.body;

    if (!input) {
        winston.log('error', 'No Input was provided');
        return res.status(400).json({ message: 'No Input was provided' });
    }

    return ControlService.TakePath(input)
        .then(test => res.json({ output: test }))
        .catch(next);
};

export default ControlController;
