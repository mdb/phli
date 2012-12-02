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

  //if (req.query.preview) options.top = 5;
  options.top = 5
  options.zip = req.query.zip

  phli.getType(req.query.type, options, function (err, data) {
    if (err) {
      res.writeHead(400)
      return res.end()
    }

    data.headings = flatten(data.d.results[0], true);

    if (req.query.preview) {  // just send our bit of JSON
      // passing flatten as the map function runs into problems with params
      data.items = data.d.results.map(function(item) {
        return flatten(item);  
      });
      res.writeHead(200, {'Content-Type': 'application/json'});
      res.write(JSON.stringify(data));
      return res.end();
    }

    res.writeHead(200, {
      'Content-Disposition': 'attachment; filename="test.csv"',
      'Content-Type': 'text/csv'
    });
    buildCSV(res, data.headings, data)
    res.end()
  });
};

function buildCSV(res, headings, data) {
  var results = data.d.results;
  var row;
  
  res.write('"' + headings.join('","') + '"\n');
  results.forEach(function(item) {
    row = flatten(item);
    res.write('"' + row.join('","') + '"\n');
  });
}

function flatten (item, useKeys) {
  var key;
  var locKey;
  var locValue;
  var value;
  var row = [];
 
  for (key in item) {
    value = item[key];
    //console.log(key, value);

    if (key === 'locations') {
      for (locKey in value) {
        locValue = value[locKey];
        if (typeof locValue === 'object' && locValue !== null) continue;
        row.push(useKeys ? locKey : locValue);
      }
    }

    if (typeof value === 'object' && value !== null) continue;
    row.push(useKeys ? key : value);
  }

  return row;
}
