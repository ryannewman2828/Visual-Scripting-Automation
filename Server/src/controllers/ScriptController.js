import ScriptService from '../services/ScriptService';

const ScriptController = {};

ScriptController.Execute = (req, res, next) => {
  const { commands } = req.body;

  return ScriptService.Execute(commands)
    .then(logs => res.status(200).json({ logs }))
    .catch(next);
};

export default ScriptController;
