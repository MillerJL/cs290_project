var express = require('express');
var router = express.Router();
var multer  = require('multer');
var upload = multer({ dest: 'public/uploads/' });

function setErrorMessage(message, session) {
  session.error = 1;
  session.error_message = message;
}

router.post('/', multer({ dest: './public/uploads/'}).single('upl'), function(req, res) {
  if(req.session.user_token && req.cookies.user_token) {
    if (req.session.token == res.cookie.user_token) {
      req.crypto.randomBytes(16, function(ex, buf) {
        var token = buf.toString('hex');
        var tempName = req.file.originalname;
        var name = tempName.split(".");
        var newFileName = name[0] + "-" + token;
        var newFileNameThumbnail = newFileName + "-" + "thumbnail." + name[1];
        var newFileName = newFileName + "." + name[1];
        var sql = 'INSERT INTO test_pictures SET ?';
        var values = { pic_name: newFileName, thumb_name: newFileNameThumbnail, fk_user_id: req.session.user_id };
        var newFileNamePath = 'public/images/' + newFileName;

        req.connection.query(sql, values, function(err, result) {
          if (!err) {
            req.fs.rename(req.file.path, newFileNamePath, function(err) {
              if (!err) {
                req.easyimg.rescrop({
                  src: newFileNamePath, dst:'public/thumbnails/' + newFileNameThumbnail,
                  width:500, height:500,
                  cropwidth:128, cropheight:128,
                  x:0, y:0
                }).then(
                function() {
                  res.redirect('/');
                });
              } else {
                setErrorMessage("Error uploading file", req.session);
                res.redirect('/');
              }
            });
          } else {
            setErrorMessage("Error uploading file", req.session);
            res.redirect('/');
          }
        });
      });
    }
  } else {
    req.flash("error", "You're not logged in you dingus");
    res.redirect('/');
  }
});

module.exports = router;
