var phli = require('phli')()

/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index');
};

/*
 * GET csv page.
 */

exports.api = function(req, res){
  if (!req.query.type) {
    res.writeHead(400);
    return res.end();
  }

  var options = {};

  if (req.query.preview) options.top = 5;
  options.zip = req.query.zip

  phli.getType(req.query.type, options, function (err, data) {
    if (err) {
      res.writeHead(400)
      return res.end()
    }


    if (req.query.preview) {  // just send our bit of JSON
      res.writeHead(200, {'Content-Type': 'application/json'});
      res.write(JSON.stringify(data));
      return res.end();
    }

    res.writeHead(200, {
      'Content-Disposition': 'attachment; filename="test.csv"',
      'Content-Type': 'text/csv'
    });
    // TODO make it csv
    res.write(JSON.stringify(data))
    res.end()
  })
};
