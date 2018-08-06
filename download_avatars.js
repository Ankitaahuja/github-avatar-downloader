var request = require('request');
var secretToken = require('./secrets');

console.log('Welcome to the GitHub Avatar Downloader!');


function getRepoContributors(repoOwner, repoName, callback) {

  var options = {
    url: "https://api.github.com/repos/" + repoOwner + "/" + repoName + "/contributors",
    headers: {
      'User-Agent': 'request',
      'Authorization': secretToken.GITHUB_TOKEN
    }
  };

 request(options, function(err, res, body) {

        callback(err, body);
  });

}



getRepoContributors("varunpositive", "SensorPlay", function(err, body) {
  console.log("Errors:", err);
  console.log("Result:", body);
});