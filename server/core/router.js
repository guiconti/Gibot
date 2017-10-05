
const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');
const fs = require('fs');
const validMimetypes = ['image/jpeg', 'image/png', 'image/bmp', 'image/gif'];

let controllers = {};
const controllersPath = process.cwd() + '/app/controllers';

//  Get our controllers modules
fs.readdirSync(controllersPath).forEach( (file) => {
  if (file.indexOf('.js') !== -1) {
    controllers[file.split('.')[0]] = require(controllersPath + '/' + file);
  }
});

let storage = multer.diskStorage({
  destination: function (req, file, cb) {
    return cb(null, 'uploads');
  },
  filename: function (req, file, cb) {
    return cb(null, Date.now() + '.' + 'jpg');
  }
});

const upload = multer({storage: storage, fileFilter: function(req, file, cb){
  return cb(null, validMimetypes.indexOf(file.mimeType));
}});

const router = express.Router();
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended: true}));

//  Trello APIs
router.post('/trello/:boardName/:listName/insert', controllers.trello.insertCard);
router.get('/trello/:boardName/:listName/list', controllers.trello.showList);

//  Telegram APIs
router.post('/telegram/message/owner', controllers.telegram.sendMessageToOwner);
router.post('/telegram/message/chat', controllers.telegram.sendMessageToChat);
router.post('/telegram/photo/owner', upload.single('image'), controllers.telegram.sendPhotoToOwner);
router.post('/telegram/photo/chat', upload.single('image'), controllers.telegram.sendPhotoToChat);

/*  Gmail APIs  */
router.get('/gmail/list', controllers.gmail.listEvents);

/*  Rag APIs    */
router.get('/ragnarok/mvp/list', controllers.ragnarok.listMvpTimer);
router.post('/ragnarok/mvp/insert', controllers.ragnarok.insertMvpTimer);

/*  Bitcoin APIs */
router.get('/bitcoin/rate', controllers.bitcoin.bitcoinExchangeRates);
router.get('/bitcoin/rate/:currency', controllers.bitcoin.bitcoinExchangeRates);

/* Reddit APIs */
router.get('/reddit/:subreddit/frontPage', controllers.reddit.getFrontPage);

module.exports = router;