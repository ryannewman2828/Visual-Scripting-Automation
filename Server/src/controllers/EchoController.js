import EchoService from '../services/EchoService';
import winston from 'winston';

const EchoController = {};

EchoController.echo = (req, res, next) => {
    const {input} = req.body;

    if (!input) {
        winston.log('error', 'No Input was provided');
        return res.status(400).json({ message: 'No Input was provided' });
    }

    return EchoService.Echo(input)
        .then(input => res.json({ output: input }))
        .catch(next);
};

export default EchoController;
