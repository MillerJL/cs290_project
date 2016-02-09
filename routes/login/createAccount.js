var express = require('express');
var router = express.Router();

router.post('/', function(req, res, next) {
  // connection.connect();
  req.connection.query('SELECT email FROM test_user', function(err, rows, fields) {
    if (err) throw err;
    for(i = 0; i < rows.length; i++) {
      if(rows[i].email == req.body.email) {
        res.send()
      }
    }
    // console.log('The solution is: ', rows);
  });
  res.send('respond with a test penis');
});
module.exports = router;
