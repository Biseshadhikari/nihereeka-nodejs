const router = require('express').Router()
const User = require('./user.models.js')
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

  router.get('/', (req, res) => {
    const posts = [
      { username: 'Jane Doe', content: 'My first post!' },
      { username: 'John Smith', content: 'EJS makes templating easy!' },
      { username: 'Alice Brown', content: 'Check out this cool app!' },
    ];
    res.render('home', { posts });
  });
  router.get('/notifications', (req, res) => {
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

  router.post('/register',(req,res)=>{ 
    console.log(req.body)
  })


  module.exports = router