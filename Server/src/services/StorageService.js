import BPromise from 'bluebird';
import winston from 'winston';
import LogicUtils from '../utils/LogicUtils';

const StorageService = {};

StorageService.Eval = (input) => {
    const value = LogicUtils.SimplifyLogicExpression(input);
    winston.log('info', `Value resolved to ${value}`);

    return BPromise.resolve(value);
};

export default StorageService;
