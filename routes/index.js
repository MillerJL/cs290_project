var express = require('express');
var router = express.Router();

// db = config.database;
// var connection = mysql.createConnection({
//   user:process.env.DB_USER,
//   database:process.env.DB_DATABASE,
//   password:process.env.DB_PASS,
//   host:process.env.DB_HOST
// });

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
  // var rows = test(db).then(res.render('index', { title: 'Test site' }));

  var rows = test(db)
  .then(function (input) {
  }, function (reason) {
  });
});

module.exports = router;
