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
  // console.log(req.body)
  res.render('index', { title: req.body.email});
});
module.exports = router;
