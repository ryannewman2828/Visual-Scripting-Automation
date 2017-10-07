const winston = require('winston');

const EchoController = {};

EchoController.echo = (req, res, next) => {
    const {input} = req.body;

    if (!input) {
        winston.log('error', 'No Input was provided');
        return res.status(400).json({ message: 'No Input was provided' });
    }

    winston.log('info', `echoing given value: ${input}`);
    return res.json({ output: input });
};

export default EchoController;
