var express = require('express');
var router = express.Router();

router.post('/', function(req, res, next) {
  delete req.session.user_email;
  delete req.session.user_name;
  delete req.session.logged_in;
  delete req.session.user_token;
  res.cookie('user_token', '', { maxAge: 10000000, httpOnly: true });

  res.redirect('/');
});

module.exports = router;
