var express = require('express');
var router = express.Router();
var multer  = require('multer');
var upload = multer({ dest: 'public/uploads/' });
var q = require('q');

function checkUploadType() {

}

function generateToken() {

}

function insertData() {

}

function createThumb() {

}

function moveUpload() {

}

router.post('/', multer({ dest: './public/uploads/'}).single('upl'), function(req, res) {
  if((req.session.user_token && req.cookies.user_token) && (req.session.token == res.cookie.user_token)) {
    if(req.file || req.body.upload-url) {
      q.fcall(checkUploadType(req))
      .then(generateToken(uploadType, req))
      .then(insertData(token, req))
      .then(createThumb(fileThumbName, req))
      .then(moveUpload(fileName, req))
      .catch(function (error) {

      })
      .done();
      req.crypto.randomBytes(16, function(ex, buf) {
        var token = buf.toString('hex');
        // var tempName = req.file.originalname;
        var name = tempName.split(".");
        var newFileName = name[0] + "-" + token;
        var newFileNameThumbnail = newFileName + "-" + "thumbnail." + name[1];
        var newFileName = newFileName + "." + name[1];
        var sql = 'INSERT INTO test_pictures SET ?';
        var values = { pic_name: newFileName, thumb_name: newFileNameThumbnail, fk_user_id: req.session.user_id };
        var newFileNamePath = 'public/images/' + newFileName;

        req.connection.query(sql, values, function(err, result) {
          if (!err) {
            // req.fs.rename(req.file.path, newFileNamePath, function(err) {
            req.fs.rename(filePath, newFileNamePath, function(err) {
              if (!err) {
                req.easyimg.rescrop({
                  src: newFileNamePath, dst:'public/thumbnails/' + newFileNameThumbnail,
                  width:300, height:300,
                  cropwidth:128, cropheight:128,
                  x:0, y:0
                }).then(
                function() {
                  res.redirect('/');
                });
              } else {
                req.flash("error", "Error processing file. Please try again");
                res.redirect('/');
              }
            });
          } else {
            req.flash("error", "Error processing file. Please try again");
            res.redirect('/');
          }
        });
      });
    } else {
      req.flash("error", "No file selected for upload");
      res.redirect('/');
    }
  } else {
    req.flash("error", "You're not logged in you dingus");
    res.redirect('/');
  }
});

module.exports = router;
