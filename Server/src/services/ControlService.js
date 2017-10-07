import BPromise from 'bluebird';
import winston from 'winston';
import LogicUtils from '../utils/LogicUtils';

const ControlService = {};

ControlService.TakePath = (input) => {
    const test  = LogicUtils.SimplifyLogicExpression(input);
    winston.log('info', `Test resolved to ${test}`);

    return BPromise.resolve(test);
};

export default ControlService;
