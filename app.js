var url = require('url');
var fs = require('fs');

function renderHTML(path, response) {
    fs.readFile(path, null, function(error, data) {
        if (error) {
            response.writeHead(404);
            response.write('File not found!');
        } else {
            response.write(data);
        }
        response.end();
    });
}

module.exports = {
  handleRequest: function(request, response) {
      response.writeHead(200, {'Content-Type': 'text/html'});

      var path = url.parse(request.url).pathname;
      switch (path) {
          case '/':
              renderHTML('./views/login.html', response);
              break;
	 case '/index':
              renderHTML('./views/index.jade', response);
              break;
          case '/cpu':
              renderHTML('./views/cpu.jade', response);
              break;
	  case '/ram':
              renderHTML('./views/ram.jade', response);
              break;
	 case '/proc':
              renderHTML('./views/proc.js', response);
              break;
          default:
              response.writeHead(404);
              response.write('Route not defined');
              response.end();
      }

  }
};
