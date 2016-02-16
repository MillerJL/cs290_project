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
  // if (req.session.views) {
  //   req.session.views++;
  //   res.setHeader('Content-Type', 'text/html');
  // } else {
  //   req.session.views = 1;
  // }
  res.render('index', { title: 'Test site', session: req.session });
});

module.exports = router;
