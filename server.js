'use strict';

// Stuff
var requestProxy = require('express-request-proxy'),
  express = require('express'),
  port = process.env.PORT || 3000,
  app = express();

  // Github Proxy Function
  var proxyGitHub = function(request, response) {
    console.log('Routing GitHub request for', request.params[0]);
    (requestProxy({
      url: 'https://api.github.com/' + request.params[0],
      headers: { Authorization: 'token ' + process.env.GITHUB_TOKEN }
    }))(request, response);
  };

//Github Proxy Call
app.get('/github/*', proxyGitHub);

//Express Call
app.use(express.static('./'));


// Almost all URL's go to index
app.get('*', function(request, response) {
  console.log('New request:', request.url);
  response.sendFile('index.html', { root: '.' });
});

// Port Listener
app.listen(port, function() {
  console.log('Server started on port ' + port + '!');
});
