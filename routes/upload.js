var express = require('express');
var router = express.Router();
var multer  = require('multer');
var upload = multer({ dest: 'public/uploads/' });
var q = require('q');
var request = require('request');

function checkUploadType(values, req, callback) {
  console.log('CHECK UPLOAD TYPE');

  var checkType = function(values, callback) {
    if(values.type == "local") {
      values.originalname = values.file.originalname;
      values.path = values.file.path;
      callback(values);
    } else {
      var download = function(uri, filename, values, callback){
        request(uri, function (error, response, body) {
          request(uri).pipe(fs.createWriteStream(filename)).on('close', callback(values));
        });
        // request.head(uri, function(err, response, callback){
        //   request(uri).pipe(fs.createWriteStream(filename)).on('close', callback(values));
        // });
      };
      values.type = "url";
      // values.originalname = ((values.file).lastIndexOf('/') + 1);
      values.originalname = values.file;

      values.path = ((values.path).lastIndexOf('/') + 1);
      download(values.file, values.originalname, values, function() {
        callback(values);
      });
    }
  }
  checkType(values, function(values){
    callback(values);
  });
}

function generateToken(values, req, callback) {
  console.log('GENERATE TOKEN');
  console.log(values);
  req.crypto.randomBytes(16, function(ex, buf) {
    var token = buf.toString('hex');
    values.token = token;
    console.log(token);
    callback(values);
  });
}

function insertData(values, req, callback) {
  console.log('INSERT DATA');
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
  values.filePath = req.file.path;
  values.newFileNameThumbnail = newFileNameThumbnail;
  req.connection.query(sql, sqlValues, function(err, result) {
    if(!err) {
      callback(values);
    } else {
      console.log("AIDSAIDSAIDS");
      throw new Error("Error processing file. Please try again");
    }
  });
}

function moveUpload(values, req, callback) {
  console.log('MOVE UPLOAD');
  console.log(values.filePath);
  console.log(values.newFileNamePath);
  req.fs.rename(values.filePath, values.newFileNamePath, function(err) {
    if (!err) {
      callback(values);
    } else {
      console.log("ALKSDJKLSDJKL");
      throw new Error("Error processing file. Please try again");
    }
  });
}

function createThumb(values, req, callback) {
  console.log('CREATE THUMB');
  var test = {
    src: values.newFileNamePath, dst:'public/thumbnails/' + values.newFileNameThumbnail,
    width:300, height:300,
    cropwidth:128, cropheight:128,
    x:0, y:0
  };
  req.easyimg.rescrop(test)
  .then(
    function(image) {
      //  console.log('Resized and cropped: ' + image.width + ' x ' + image.height);
       callback(values);
    },
    function (err) {
      console.log(err);
    }
  );
}

router.post('/', multer({ dest: './public/uploads/'}).single('upl'), function(req, res) {
  if((req.session.user_token && req.cookies.user_token) && (req.session.token == res.cookie.user_token)) {
    if(req.file || req.body.upload-url) {
      values = {};
      if(req.file) {
        values.file = req.file;
        values.type = "local";
      } else {
        values.file = req.body.upload-url;
        values.type = "url";
      }
      checkUploadType(values, req, function(values) {
        generateToken(values, req, function(values) {
          insertData(values, req, function(values) {
            moveUpload(values, req, function(values) {
              createThumb(values, req, function(values) {
                res.redirect('/');
              });
            });
          });
        });
      });
    } else {
      req.flash("error", "You're not logged in you dingus");
      res.redirect('/');
    }
  }
});

module.exports = router;
