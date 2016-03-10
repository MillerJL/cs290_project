//var request = require('request');
//handle text
function handleText(text) {
  var lower = text.toLowerCase();
  lower = lower.replace(/[^a-zA-Z0-9 ]+/g, '').replace('/ {2,}/',' ');
  lower = lower.split(" ");
  return lower;
}
// what gets required by the app.
module.exports = function (req, res, next) {
  var request = require('request');
  var text = handleText(req.body.text);

  var obj = {
    words: [],
    counts: []
  }

  for (var i = 0; i < text.length; i++) {
    var exists = false;
    for (var j = 0; j < obj.words.length; j++) {
      if (text[i] == obj.words[j]) {
        exists = true;
        obj.counts[j] = obj.counts[j] + 1;
      }
    }
    if (!exists) {
      obj.words.push(text[i]);
      obj.counts.push(1);
    }
    exists = false;
  }

  // console.log(obj);
  // console.log(req.body.user_name);

// Sanity check. We don't want our slackbot to make this shit infinite.
  // request.post('http://localhost:3000/chat', {form:{key:obj}})
  request.post({url:'http://localhost:3000/chat', form:{key:obj}}, function(err, httpResponse, body) {
   if(err) {
     console.log(err);
     next();
   } else {

   }
  });
  var userName = req.body.user_name;
  // console.log(userName);
  if (userName !== 'outgoing-webhook') {
    return res.status(200).end();
  } else {
    return res.status(200).end();
  }
  process.on('uncaughtException', function (error) {
   console.log(error.stack);
 });

}
