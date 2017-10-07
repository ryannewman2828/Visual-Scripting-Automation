import winston from 'winston';
import BPromise from 'bluebird';
import fetch from 'node-fetch';

const GithubService = {};
const BASE_API = 'https://api.github.com';

GithubService.GetRepos = (username) => {
  const url = `${BASE_API}/users/${username}/repos`;

  return fetch(url)
    .then(response => response.json())
    .then(response => {
      winston.log('info', `Call to ${url} resulted in a ${response.statusCode}`);
      return response;
    })
    .catch(err => {
      winston.log('error', err.message);
      return BPromise.reject(err);
    })
};

export default GithubService;
