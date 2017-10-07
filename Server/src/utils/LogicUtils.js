import winston from 'winston';

const LogicUtils = {};

// Note usage of eval is insecure in this context due to code injection
LogicUtils.SimplifyLogicExpression = (expression) => {
    return eval(expression); // Change this to my own parser
};

export default LogicUtils;
