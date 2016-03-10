var express = require('express');
var router = express.Router();

function checkValue(rows, words, callback) {
  callback(null,(words).indexOf(rows.word));
}

function checkValueNoCall(needle, haystack) {
  return (haystack).indexOf(needle) > -1;
}

router.get('/', function(req, res, next) {
  var sql = "SELECT word AS text, count AS weight FROM word_cloud ORDER BY count LIMIT 40";

  req.connection.query(sql, function(err, rows, fields) {
    console.log(rows);
    res.render('chat', { title: 'SDP - Chat', session: req.session, words: rows });
  });
});

router.post('/', function(req, res, next) {
  var length = req.body.key.length;
  var lengthCounter = 0;
  var values = req.body.key;
  var sql = "SELECT id, word, count FROM word_cloud WHERE word IN (?)";

  var matchedWords = [];
  var matchedWordsList = [];
  var newWords = [];

  // console.log(values);

  var query = req.connection.query(sql, [values.words]);

  query
  .on('error', function(err) {
    // Handle error, an 'end' event will be emitted after this as well
    console.log(err);
  })
  .on('fields', function(fields) {
  // the field packets for the rows to follow
  })
  .on('result', function(row) {
  // Pausing the connnection is useful if your processing involves I/O
    req.connection.pause();

    checkValue(row, values.words, function(err, match) {
      // var temp1 = parseFloat(values.counts[match]);
      // temp1 += parseFloat(row.count);
      var temp = parseInt(values.counts[match], 10) + parseInt(row.count,10);
      matchedWords.push([temp, row.word]);
      matchedWordsList.push(row.word);

      req.connection.resume();
    })
  })
  .on('end', function() {
    for(i=0; i<values.words.length; i++) {
      if(checkValueNoCall(values.words[i], matchedWordsList)) {

      } else {
        newWords.push([values.words[i], values.counts[i]]);
      }
    }

    if(newWords.length > 0) {
      var sqlInsert = "INSERT INTO word_cloud (word,count) VALUES ?";
      req.connection.query(sqlInsert, [newWords], function(err, results) {

      });
    }
    if(matchedWords.length > 0) {
      var sqlUpdate = "UPDATE word_cloud SET count = ? WHERE word = ?";
      for(i=0; i<matchedWords.length; i++) {
        req.connection.query(sqlUpdate, [matchedWords[i][0],matchedWords[i][1]], function(err, results) {
        });
      }
    }
  });
  res.sendStatus(500);
});

module.exports = router;
