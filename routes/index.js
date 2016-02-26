var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  if(req.session.user_id) {
    req.connection.query('SELECT thumb_name, pic_name from test_pictures WHERE fk_user_id = ? ORDER BY id DESC LIMIT 24', [req.session.user_id], function(err, rows, fields) {
      if (!err) {
        res.render('index', { title: 'SDP', session: req.session, images: rows});
      } else {
        res.render('index', { title: 'SDP', session: req.session, images: rows });
      }
    });
  } else {
    res.render('index_not_logged', { title: 'SDP', session: req.session });
  }
});

module.exports = router;
