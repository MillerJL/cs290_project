var express = require('express');
var router = express.Router();
var multer  = require('multer');
var upload = multer({ dest: 'public/uploads/' });
var q = require('q');
var request = require('request');

function checkUploadType(values) {
  console.log('CHECK UPLOAD TYPE');

  var checkType = function(values, callback) {
    if(values.type == "local") {
      values.originalname = values.file.originalname;
      values.path = values.file.path;
      console.log("ASS TIER");
      console.log(values);
      callback(values);
    } else {
      var download = function(uri, filename, values, callback){
        request.head(uri, function(err, res, callback){
          request(uri).pipe(fs.createWriteStream(filename)).on('close', callback(values));
        });
      };
      values.type = "url";
      values.originalname = ((values.file.originalname).lastIndexOf('/') + 1);
      values.path = ((values.file.path).lastIndexOf('/') + 1);
      download(values.file, values.originalname, values, function() {
        callback(values);
      });
    }
  }
  checkType(values, function(values){
    console.log("AIDS");
    // console.log(values);
    return values;
  // });
}

function generateToken(values) {
  console.log('GENERATE TOKEN');
  console.log(values);
  req.crypto.randomBytes(16, function(ex, buf) {
    var token = buf.toString('hex');
    console.log(token);
  });
}

function insertData(req, token, upload) {
  console.log('INSERT DATA');
  var newFileInfo = {};
  var sql = 'INSERT INTO test_pictures SET ?';
  var tempName = upload.originalname;
  var name = tempName.split(".");
  var newFileName = name[0] + "-" + token;
  var newFileNameThumbnail = newFileName + "-" + "thumbnail." + name[1];
  var newFileName = newFileName + "." + name[1];
  var values = { pic_name: newFileName, thumb_name: newFileNameThumbnail, fk_user_id: req.session.user_id };
  var newFileNamePath = 'public/images/' + newFileName;

  newFileInfo.newFileName = newFileName;
  newFileInfo.newFileNamePath = newFileNamePath;
  newFileInfo.filePath = req.file.path;
  req.connection.query(sql, values, function(err, result) {
    if(!err) {
      return newFileInfo;
    } else {
      throw new Error("Error processing file. Please try again");
    }
  });
}

function moveUpload(newFileInfo, req) {
  console.log('MOVE UPLOAD');
  req.fs.rename(newFileInfo.filePath, newFileInfo.newFileNamePath, function(err) {
    if (!err) {
    } else {
      throw new Error("Error processing file. Please try again");
    }
  });
}

function createThumb(newFileInfo, req) {
  console.log('CREATE THUMB');
  var test = {
    src: newFileInfo.newFileNamePath, dst:'public/thumbnails/' + newFileInfo.newFileNameThumbnail,
    width:300, height:300,
    cropwidth:128, cropheight:128,
    x:0, y:0
  };
  req.easyimg.rescrop(test, function(err) {
    if (!err) {
    } else {
      throw new Error("Error processing file. Please try again");
    }
  });
}

router.post('/', multer({ dest: './public/uploads/'}).single('upl'), function(req, res) {
  if((req.session.user_token && req.cookies.user_token) && (req.session.token == res.cookie.user_token)) {
    if(req.file || req.body.upload-url) {
      var promise = q.promise(function(fulfill, reject) {
        var values = {};
        if(req.file) {
          values.file = req.file;
          values.type = "local";
        } else {
          values.file = req.body.upload-url;
          values.type = "url";
        }
        fulfill(values);
      });
      promise
      .then(checkUploadType)
      .then(generateToken)
      .then(insertData)
      .then(moveUpload)
      .then(createThumb)
      .catch(function (error) {
        // req.flash("error", error);
        console.log("ERROR");
      })
      .done(
        // console.log('FUCKFUCKFUCKFUCK')
        res.redirect('/')
      );
    } else {
      req.flash("error", "You're not logged in you dingus");
      res.redirect('/');
    }
  }
});

module.exports = router;
