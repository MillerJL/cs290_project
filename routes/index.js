var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  // if (req.session.views) {
  //   req.session.views++;
  //   res.setHeader('Content-Type', 'text/html');
  // } else {
  //   req.session.views = 1;
  // }
  if(req.session.user_id) {
    req.connection.query('SELECT pic_name from test_pictures WHERE fk_user_id = ? ORDER BY id DESC LIMIT 24', [req.session.user_id], function(err, rows, fields) {
      if (!err) {
        res.render('index', { title: 'SDP', session: req.session, images: rows});
      } else {
        // req.connection.query('SELECT pic_name from test_pictures WHERE fk_user_id = ?', [req.session.user_id], function(err, rows, fields) {
          res.render('index', { title: 'SDP', session: req.session, images: rows });
        // });
      }
    });
  } else {
    console.log('not logged in');
    res.render('index_not_logged', { title: 'SDP', session: req.session });
  }
});

module.exports = router;
