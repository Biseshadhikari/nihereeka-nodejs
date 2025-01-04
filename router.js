const router = require('express').Router()
const User = require('./user.models.js')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const Post = require('./post.models');

const {authenticateUser,notauthenticateUser} = require('./middleware.js')
router.get('/profile', (req, res) => {
    const user = {
      name: 'Jane Doe',
      bio: 'Love coding and coffee!',
      followers: 120,
      following: 80,
      posts: ['My first post!', 'Hello, world!', 'EJS is awesome!'],
    };
    res.render('profile', { user });
  });

  
  router.get('/notifications',authenticateUser, (req, res) => {
    const notifications = [
      { type: 'like', message: 'John liked your post.' },
      { type: 'comment', message: 'Alice commented: "Great post!"' },
      { type: 'follow', message: 'Bob started following you.' },
    ];
    res.render('notifications', { notifications });
  });

  router.get('/create-post', (req, res) => {
    res.render('create-post');

  });
  
  router.post('/create-post', (req, res) => {
    const { content } = req.body;
   
    console.log(`New post: ${content}`);
    res.redirect('/');
  });

  router.get('/register',notauthenticateUser, (req, res) => {
    res.render('register');
  });
  router.post('/register',notauthenticateUser, async (req, res) => {
    const { username, email, password } = req.body;
  
    // Validation (silent)
    if (!username || !email || !password) {
      return res.redirect('/register'); // Stay on the same page silently if validation fails
    }
  
    try {
      // Hash the password using bcrypt
      const hashedPassword = await bcrypt.hash(password, 10); // 10 is the salt rounds
  
      // Create a new user with the hashed password
      const newUser = new User({
        username,
        email,
        password: hashedPassword, // Save the hashed password, not the plain text one
      });
  
      // Save the new user to the database
      await newUser.save();
  
      console.log('User saved', newUser);
      res.redirect('/'); // Redirect after successful registration
    } catch (err) {
      console.error(err);
      res.redirect('/register'); // Stay on the same page silently if error occurs
    }
  });
  

  router.get('/login',notauthenticateUser, (req, res) => {
    res.render('login');
     // Clear the message after displaying it
  });

  // Login route (POST) - Handle login logic
router.post('/login',notauthenticateUser, async (req, res) => {
  let { username, password } = req.body;

  // Check if username exists
  const user = await User.findOne({ username });
  if (!user) {

    return res.redirect('/login');
  }

  // Compare the provided password with the stored hashed password
  const verifyUser = await bcrypt.compare(password, user.password);
  if (!verifyUser) {

    return res.redirect('/login');
  }

  // Generate JWT token
  const token = jwt.sign(
    { id: user._id, username: user.username, email: user.email },
    'biseshadhikari123'
  );

  // Set the token as a cookie
  res.cookie('token', token); 
  return res.redirect('/');
});

router.get('/', authenticateUser, async (req, res) => {
  try {
    const posts = await Post.find().populate('users');
    const user = req.user; 
    console.log(posts)
    res.render('home', { posts, user });
  } catch (err) {
    console.error(err);
    res.status(500).send('Error fetching posts');
  }
});
router.post('/posts', authenticateUser, async (req, res) => {
  const { title, content } = req.body;
  const userId = req.user.id; // Authenticated user ID

  try {
    const newPost = new Post({
      title,
      content,
      users: userId,
    });
    await newPost.save();
    res.redirect('/');
  } catch (err) {
    console.error(err);
    res.status(500).send('Error creating post');
  }
});

  module.exports = router