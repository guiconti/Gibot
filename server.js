/*  global express:true*/
/*  global _:true*/
/*  global trelloKey:true*/
/*  global trelloToken:true*/

//  Loading our environment variables
require('dotenv').config();

express = require('express');
_       = require('underscore');

require('./app/core/router');
require('./app/core/gibimbot');