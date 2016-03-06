var express = require('express');
var router = express.Router();

router.get('/fuck/login', function(req, res, next) {
  res.send('fuck fuck fuck left beef');
});

/* GET home page. */
router.get('/', function(req, res, next) {
  var db = req.connection;

  db.query('SELECT * FROM test_user', function(err, rows, fields) {
    if (err) throw err;
    res.render('index', { title: 'Test site', data: rows });
  });
});

module.exports = router;
