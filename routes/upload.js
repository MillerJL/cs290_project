var express = require('express');
var router = express.Router();
var multer  = require('multer');
var upload = multer({ dest: 'public/uploads/' });
var q = require('q');



function checkUploadType(values, req, callback) {
  var checkType = function(values, cb) {
    if(values.type == "local") {
      values.originalname = values.file.originalname;
      values.path = values.file.path;
      cb(null, values);
    } else {
      var download = function(uri, filename, re) {
        req.request.head(uri, function(err, res, body){
          var accepted = ['image/jpg', 'image/png', 'image/jpeg'];

          if(res && accepted.indexOf(res.headers['content-type']) > -1) {
            req.request(uri).pipe(req.fs.createWriteStream(filename)).on('close', re);
          } else {
            re("Only image types: jpg, png are allowed");
          }
        });
      };
      values.type = "url";
      values.originalname = (values.file.substr(values.file.lastIndexOf('/') + 1));
      values.path = "public/uploads/" + values.originalname;

      download(values.file, values.path, function(err) {
        cb(err, values);
      });
    }
  }
  checkType(values, function(err, values){
    callback(err, values);
  });
}

function generateToken(values, req, callback) {
  // console.log('GENERATE TOKEN');
  var err = null;
  req.crypto.randomBytes(8, function(ex, buf) {
    var token = buf.toString('hex');
    values.token = token;
    callback(err, values);
  });
}

function insertData(values, req, callback) {
  // console.log('INSERT DATA');
  var err = null;

  var sql = 'INSERT INTO test_pictures SET ?';
  var tempName = values.originalname;
  var name = tempName.split(".");
  var newFileName = name[0] + "-" + values.token;
  var newFileNameThumbnail = newFileName + "-" + "thumbnail." + name[1];
  var newFileName = newFileName + "." + name[1];
  var sqlValues = { pic_name: newFileName, thumb_name: newFileNameThumbnail, fk_user_id: req.session.user_id };
  var newFileNamePath = 'public/images/' + newFileName;

  values.newFileName = newFileName;
  values.newFileNamePath = newFileNamePath;
  values.filePath = values.path;
  values.newFileNameThumbnail = newFileNameThumbnail;
  req.connection.query(sql, sqlValues, function(err, result) {
    if(!err) {
      callback(err, values);
    } else {
      throw new Error(" processing file. Please try again");
      callback(err, values);
    }
  });
}

function moveUpload(values, req, callback) {
  // console.log('MOVE UPLOAD');
  var err = null;

  req.fs.rename(values.filePath, values.newFileNamePath, function(err) {
    if (!err) {
      callback(err, values);
    } else {
      throw new Error("Error processing file. Please try again");
    }
  });
}

function createThumb(values, req, callback) {
  // console.log('CREATE THUMB');
  var err = null;

  var test = {
    src: values.newFileNamePath, dst:'public/thumbnails/' + values.newFileNameThumbnail,
    width:300, height:300,
    cropwidth:128, cropheight:128,
    x:0, y:0
  };
  req.easyimg.rescrop(test)
  .then(
    function(image) {
       callback(err, values);
    },
    function (err) {
      console.log(err);
      callback(err, values);
    }
  );
}

function sendError(req, res, err) {
  req.flash("error", err);
  res.redirect('/');
}

router.post('/', multer({ dest: './public/uploads/'}).single('upl'), function(req, res) {
  if((req.session.user_token && req.cookies.user_token) && (req.session.token == res.cookie.user_token)) {
    if(req.file || req.body.upload_url) {
      values = {};
      if(req.file) {
        values.file = req.file;
        values.type = "local";
      } else {
        values.file = req.body.upload_url;
        values.type = "url";
      }
      // I am so sorry
      checkUploadType(values, req, function(err, values) {
        if(err)
          sendError(req, res, err);
        else {
          generateToken(values, req, function(err, values) {
            if(err)
              sendError(req, res, err);
            else {
              insertData(values, req, function(err, values) {
                if(err)
                  sendError(req, res, err);
                else {
                  moveUpload(values, req, function(err, values) {
                    if(err)
                      sendError(req, res, err);
                    else {
                      createThumb(values, req, function(err, values) {
                        res.redirect('/');
                      });
                    }
                  });
                }
              });
            }
          });
        }
      });
    } else {
      req.flash("error", "You're not logged in you dingus");
      res.redirect('/');
    }
  }
});

module.exports = router;
