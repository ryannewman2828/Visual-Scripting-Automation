import winston from 'winston';
import LogicUtils from '../utils/LogicUtils';

const ControlController = {};

ControlController.TakePath = (req, res, next) => {
    const { input } = req.body;

    if (!input) {
        winston.log('error', 'No Input was provided');
        return res.status(400).json({ message: 'No Input was provided' });
    }

    const test  = LogicUtils.SimplifyLogicExpression(input);
    winston.log('info', `Test resolved to ${test}`);

    return res.json({ output: test });
};

export default ControlController;
