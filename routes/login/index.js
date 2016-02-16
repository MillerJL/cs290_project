var express = require('express');
var router = express.Router();

function test(db) {
  db.query('SELECT * from test_user', function(err, rows, fields) {
    if (!err)
      return rows;
    else
      console.log('Error while performing Query.');
  });
}

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('login', { title: 'Test site'});
});

router.post('/', function(req, res, next) {
  req.connection.query('SELECT * from test_user WHERE email = ?', [req.body.email], function(err, rows, fields) {
    if (!err) {
      if(rows.length != 0) {
        if(req.bcrypt.compareSync(req.body.password, rows[0].password)) {
          // set session
          req.session.user_email = req.body.email;
          req.session.user_name = rows[0].name;
          req.crypto.randomBytes(48, function(ex, buf) {
            var token = buf.toString('hex');
            req.session.user_token = token;
            console.log(req.session.user_token);
            res.cookie('user_token', token, { maxAge: 10000000, httpOnly: true });
            res.redirect('/');
          });
        } else {
          res.render('login', {valid_login: 1, error_message: "Login information invalid"});
        }
      } else {
        res.render('login', {valid_login: 1, error_message: "Login information invalid"});
      }
    } else
      console.log('Error while performing Query.');
  });
});
module.exports = router;
