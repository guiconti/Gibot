/*  global express:true*/
/*  global PORT:true*/
/*  global fs:true*/
/*  global request:true*/

var app = express();
var bodyParser = require('body-parser');

//  GLOBAL VARIABLES
PORT = process.env.PORT || 3101;
authenticationTrelloSuffix = '&key=' + process.env.TRELLO_KEY + '&token=' + process.env.TRELLO_TOKEN;

var path = require('path');
frontPath = path.join(__dirname, '../../front');
layoutPath = path.join(__dirname, '../../front/layouts');
viewPath = path.join(__dirname, '../../front/views');
var assetPath = path.join(__dirname, '../../front/assets');

var trello = {};
var trelloPath = process.cwd() + '/app/controllers/Trello';

//  Engine for the handlebars template
hbs  = require('express-handlebars');

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

//  Define Views Engines
app.set('view engine', '.html');

//  Use bodyparser as our express parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

//  Defining views engines
app.engine('.html', hbs({extname: '.html', layoutsDir:layoutPath}));
app.set('view engine', '.html');
app.set('views', viewPath);

//  Assets as a path
app.use('/assets', express.static(assetPath));

//  Home APIs
app.get('/', (req, res) => {
    res.render('index', {layout: 'navbar', name: 'OHIHIO'});
});

app.get('/trello', (req, res) => {
    res.render('form', {layout: 'navbar', name: 'OHIHIO'});
});

//  Trello APIs
app.post('/trello/:boardName/:listName/insert', trello.project.insertCard);
app.get('/trello/:boardName/:listName/list', trello.project.showList);

app.listen(PORT, () => {
    console.log('Server is functional on ' + PORT + ' port on ' + process.env.NODE_ENV + " environment.");
});