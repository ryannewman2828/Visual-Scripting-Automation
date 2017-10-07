import BPromise from 'bluebird';
import winston from 'winston';

const EchoService = {};

EchoService.Echo = (input) => {
    winston.log('info', `echoing given value: ${input}`);
    return BPromise.resolve(input);
};

export default EchoService;
