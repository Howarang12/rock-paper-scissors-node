
const http = require('http'); 
const fs = require('fs')
const url = require('url');
const querystring = require('querystring');
const figlet = require('figlet')

const server = http.createServer((req, res) => {

  const readWrite = (file, contentType) => {
    fs.readFile(file, function(err, data) {
      res.writeHead(200, {'Content-Type': `${contentType}`});
      res.write(data);
      res.end();
    });
  }

  const page = url.parse(req.url).pathname;
  const params = querystring.parse(url.parse(req.url).query);
  console.log(page);
  
  switch(page){
    case '/':
      readWrite('index.html', 'text/html')
      break;
    case '/api':
      let botRPS = Math.ceil(Math.random() * 3)
      let botChoice = ''
      if(botRPS === 1){
        botChoice = 'rock'
      } else if (botRPS === 2){
        botChoice = 'paper'
      } else {
        botChoice = 'scissors'
      }
      res.writeHead(200, {'Content-Type': 'application/json'});
      const objToJson = {
              bot: botChoice
            }
      res.end(JSON.stringify(objToJson));
      break;
    case '/css/style.css':
      fs.readFile('css/style.css', function(err, data) {
        res.write(data);
        res.end();
      });
      break;
    case '/js/main.js':
      readWrite('js/main.js', 'text/javascript')
      break;
    case '/img/rock.png':
      readWrite('img/rock.png', 'image/png')
      break;
    case '/img/paper.png':
      readWrite('img/paper.png', 'image/png') 
      break;
    case '/img/scissors.png':
      readWrite('img/scissors.png', 'image/png') 
       break;
    default: 
      figlet('404!!', function(err, data) {
        if (err) {
            console.log('Something went wrong...');
            console.dir(err);
            return;
        }
        res.write(data);
        res.end();
      });
      break;
  }
});


server.listen(8000);
