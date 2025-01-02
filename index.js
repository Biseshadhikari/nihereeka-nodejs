const express = require('express');
const bodyParser = require('body-parser');
const router = require('./router.js')
const app = express();
const dbconnect = require('./dbconnect.js')

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(router)
app.set('view engine', 'ejs');
app.set('views', './views');

dbconnect()



app.listen(3000, () => console.log('Server is running on http://localhost:3000'));