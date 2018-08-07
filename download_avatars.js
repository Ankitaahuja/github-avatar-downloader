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



getRepoContributors("jquery", "jquery", function(err, body) {
  console.log("Errors:", err);
  var bodyObj = JSON.parse(body);
  bodyObj.forEach(function(element) {
  console.log("Avatar URL: "+element.avatar_url);
});

  // console.log("Avatar URL: "+bodyObj[0].avatar_url);

});