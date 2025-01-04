const express = require('express');
const bodyParser = require('body-parser');
const router = require('./router.js')
const app = express();
const dbconnect = require('./dbconnect.js')
const expressLayouts = require('express-ejs-layouts');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cookieparser = require('cookie-parser')




// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(expressLayouts);
app.use(cookieparser())
app.use(router)



app.set('view engine', 'ejs');
app.set('views', './views');
app.set('layout', 'layout'); 

dbconnect()



app.listen(3000, () => console.log('Server is running on http://localhost:3000'));
