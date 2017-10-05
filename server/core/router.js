
const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');
const fs = require('fs');
const validMimetypes = ['image/jpeg', 'image/png', 'image/bmp', 'image/gif'];

let controllers = {};
const controllersPath = process.cwd() + '/server/controllers';

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

//  Telegram APIs
router.post('/telegram/message/owner', controllers.telegram.sendMessageToOwner);
router.post('/telegram/message/chat', controllers.telegram.sendMessageToChat);
router.post('/telegram/photo/owner', upload.single('image'), controllers.telegram.sendPhotoToOwner);
router.post('/telegram/photo/chat', upload.single('image'), controllers.telegram.sendPhotoToChat);

module.exports = router;