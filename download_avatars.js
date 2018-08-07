var request = require('request');
var secretToken = require('./secrets');
var fs = require('fs');

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



function downloadImageByURL(url, filePath) {

  request.get(url)
       .on('error', function (err) {
        console.log(err);
       })
       .on('response', function (response) {
         console.log('Downloading image...');
       })
       .pipe(fs.createWriteStream(filePath))
       .on('finish', function() {
        console.log('Download complete.');
    });


}


//downloadImageByURL("https://avatars2.githubusercontent.com/u/2741?v=3&s=466", "avatars/kvirani.jpg");


getRepoContributors("jquery", "jquery", function(err, body) {
  console.log("Errors:", err);
  var bodyObj = JSON.parse(body);

  bodyObj.forEach(function(element) {

    console.log("Avatar URL: "+element.avatar_url);
    var filePath = "avatars/"+element.login+".jpg";
    downloadImageByURL(element.avatar_url, filePath);

  });

});


