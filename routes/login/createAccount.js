var express = require('express');
var router = express.Router();

router.post('/', function(req, res, next) {
  req.connection.query('SELECT email FROM test_user', function(err, rows, fields) {
    var valid_create_account = 0;
    var error_message = "";
    var error = 0;

    if (err) throw err;
    for(i = 0; i < rows.length; i++) {
      if(rows[i].email == req.body.email) {
        valid_create_account = 1;
        error_message = "Email already in use";
        error = 1;
        break;
      }
    }
    if(error == 1) {
      res.render('login', { title: 'SDP - login', valid_create_account: valid_create_account, error_message: error_message, session: req.session});
    } else {
      var sql = 'INSERT INTO test_user SET ?';
      var values = { name: req.body.name, email: req.body.email, password: req.bcrypt.hashSync(req.body.password, req.salt)};
      req.connection.query(sql, values, function(err, result) {
        if (err) throw err;
        res.redirect('/login');
      });
    }
  });
});
module.exports = router;
