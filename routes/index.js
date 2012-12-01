
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
  res.writeHead(200, {
    'Content-Disposition': 'attachment; filename="test.csv"',
    'Content-Type': 'text/csv'
  })
  res.write('Thing1,Thing2,Thing3\na,b,c\nd,e,f')
  res.end()
};
