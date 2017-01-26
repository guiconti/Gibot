/*  global express:true*/
/*  global _:true*/

//  Loading our environment variables
require('dotenv').config();

express = require('express');
_       = require('underscore');

require('./app/core/router');
require('./app/core/gibimbot');
require('./app/core/gmailAuth');