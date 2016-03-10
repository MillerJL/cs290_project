var express = require('express');
var router = express.Router();

router.post('/', function(req, res, next) {
  var length = req.body.key.length;
  var lengthCounter = 0;
  var values = req.body.key;
  var sql = "SELECT id, word, count FROM word_cloud WHERE word IN (?)";

  console.log(values);

  req.connection.query(sql, [values.words], function (err, results){
    console.log(results);
  //  console.log(results[0].word);
  //  var count = results.length;
    var matching = {
      words: [],
      counts: []
    }
    var notMatching = {
      words: [],
      counts: []
    }
    console.log("flag1");
    var i, j;
    for(i = 0; i < results.length; i++){
      matching.words.push(1);
      matching.counts.push(1);
      matching.words[i] = results[i].word;
      matching.counts[i] = results[i].count;
    }
    console.log(matching);
    console.log("flag2");
    for(i = 0; i < (values.words.length - results.length); i++){
      notMatching.words.push(1);
      notMatching.counts.push(1);
    }
    console.log("flag3");
    for(i = 0; i < values.words.length; i++){
      for(j = 0; j < results.length; j++){
        if(values.words[i] != results[j].word){
          notMatching.words[i] = values.words[j];
          notMatching.count[i] = values.count[j];
        }
      }
    }
    console.log(err);
    console.log("flag4");
    console.log(matching);
    console.log(notMatching);
    console.log("flag5");



    //update values, but don't insert
    //insert the dump
    //insert the update


    //make array size # of matching words
    //for(var i = 0; i < count; i++){
    //    arr.push(1);
    //}

    //for all matching rows update wordCount

    //query updated work count where word =

/*
    for(i = 0; i < newData.length; i++){
      for(j = 0; j < values.words.length; j++){
        values.count[j] = results[i].count + values.count[j];
      }
    }*/
//    console.log("flag 2");
//    var num = -4;
//    var upd = 'UPDATE word_cloud SET count = count + ' + num + ' WHERE word = "the"';
//    req.connection.query(upd, function(err, results){});
});

});

module.exports = router;
