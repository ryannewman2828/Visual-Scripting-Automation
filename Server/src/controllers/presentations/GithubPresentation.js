const GithubPresentation = {};

GithubPresentation.PresentItem = (repo) => ({
  ...repo, // temp present all
});

GithubPresentation.PresentList = (repoList) => repoList.map(GithubPresentation.PresentItem);

export default GithubPresentation;
