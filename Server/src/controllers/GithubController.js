import GithubService from '../services/GithubService';
import GithubPresentation from './presentations/GithubPresentation';
import winston from 'winston';

const GithubController = {};

GithubController.GetRepos = (req, res, next) => {
    const { username } = req.body;
  console.log(req.body);

    if (!username) {
        winston.log('error', 'No username was provided');
        return res.status(400).json({ message: 'No username was provided' });
    }

    GithubService.GetRepos(username)
      .then(GithubPresentation.PresentList)
      .then(repoList => res.json(repoList))
      .catch(next);
};

export default GithubController;
