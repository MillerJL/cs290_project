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
  var db = req.connection;
  var cookie = req.cookies.cookieName;
  if (req.session.views) {
    req.session.views++;
    res.setHeader('Content-Type', 'text/html');
  } else {
    req.session.views = 1;
  }

  db.query('SELECT * FROM test_user', function(err, rows, fields) {
    if (err) throw err;
    console.log(rows);
    res.render('index', { title: 'Test site', data: rows });
  });
});

module.exports = router;
