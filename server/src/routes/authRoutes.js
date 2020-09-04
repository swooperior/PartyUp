const express = require('express');
const db = require('../../config/db.js');

router = express.Router();

router.get('/api/login',(req, res)=>{
  //Validate user and log in, return a JWT.
});

router.post('/api/register',(req, res)=>{
  //Register a new user using Blizzard OAuth.
});

module.exports = router;