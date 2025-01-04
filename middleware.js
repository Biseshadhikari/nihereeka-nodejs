const jwt = require('jsonwebtoken');

const authenticateUser = (req, res, next) => {
    try {
        // Retrieve the token from cookies
        const token = req.cookies.token;
        if (!token) {
            return res.redirect('/login');
        }

        // Verify the token
        const decoded = jwt.verify(token, 'biseshadhikari123'); 

        req.user = decoded;


        next(); // Continue to the route handler
    } catch (error) {
        console.error('Authentication error:', error);
        res.redirect('/login');
    }
};
const notauthenticateUser = (req, res, next) => {
    try {
        // Retrieve the token from cookies
        const token = req.cookies.token;
        console.log(token)
        if (!token) {
            next()
        }
        else{ 
            return res.redirect('/')
        }

        // Verify the token

    } catch (error) {
        console.error('Authentication error:', error);
        res.redirect('/login');
    }
};

module.exports = {authenticateUser,notauthenticateUser}