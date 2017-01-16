/*  global express:true*/
/*  global PORT:true*/
/*  global fs:true*/
/*  global request:true*/

var app = express();
var bodyParser = require('body-parser');

//  GLOBAL VARIABLES
PORT = process.env.PORT || 3101;
authenticationTrelloSuffix = '&key=' + process.env.TRELLO_KEY + '&token=' + process.env.TRELLO_TOKEN;

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
app.post('/trello/:boardName/:listName/insert', trello.project.insertCard);
app.get('/trello/:boardName/:listName/list', trello.project.showList);

app.listen(PORT, () => {
    console.log('Server is functional on ' + PORT + ' port on ' + process.env.NODE_ENV + " environment.");
});