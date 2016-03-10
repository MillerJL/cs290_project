var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  if((req.session.user_token && req.cookies.user_token) &&
  (req.session.token == res.cookie.user_token)) {
    var sql = 'SELECT * FROM test_pictures WHERE fk_user_id = ? AND thumb_name = ?';
    req.connection.query(sql, [req.session.user_id, req.query.thumb_name], function(err, rows, fields) {
      res.send('<img src="/images/' + rows[0].pic_name + '" id="modal-image">');
    });
  } else {
    res.send('log in ya dingus');
  }
});

module.exports = router;
