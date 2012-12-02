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

exports.csv = function(req, res){
  phli.getPermits({zip: '19143', top: 5}, function (err, data) {
    if (err) {
      res.writeHead(500)
      return res.end()
    }
    res.writeHead(200, {
      'Content-Disposition': 'attachment; filename="test.csv"',
      'Content-Type': 'text/csv'
    })
    res.write(JSON.stringify(data))
    res.end()
  })
};
