/*  global express:true*/
/*  global PORT:true*/
/*  global fs:true*/
/*  global request:true*/

var app = express();
var bodyParser = require('body-parser');

//  GLOBAL VARIABLES
PORT = process.env.PORT || 3101;
trelloKey = process.env.TRELLO_KEY;
trelloToken = process.env.TRELLO_TOKEN;

var trello = {};
var trelloPath = process.cwd() + '/app/controllers/Trello';

//  Global modules
fs = require('fs');
request = require('request');
trelloUtils = require(process.cwd() + '/app/utils/trelloUtils');
validation = require(process.cwd() + '/app/utils/validation'); 

//  Get our controllers modules
fs.readdirSync(trelloPath).forEach( (file) => {
    if (file.indexOf('.js') !== -1) {
        trello[file.split('.')[0]] = require(trelloPath + '/' + file);
    }
});

//  Use bodyparser as our express parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

//  Trello APIs
app.post('/trello/projects/backlog/insert', trello.project.insertBacklog);
app.get('/trello/projects/backlog/list', trello.project.listBacklog);

app.listen(PORT, () => {
    console.log('Server is functional on ' + PORT + ' port on ' + process.env.NODE_ENV + " environment.");
});