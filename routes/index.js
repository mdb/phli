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
    var csvHeadings;

    if (err) {
      res.writeHead(400)
      return res.end()
    }

    csvHeadings = buildHeadingsList(data.d.results[0]);

    if (req.query.preview) {  // just send our bit of JSON
      res.writeHead(200, {'Content-Type': 'application/json'});
      res.write(JSON.stringify(data));
      return res.end();
    }

    res.writeHead(200, {
      'Content-Disposition': 'attachment; filename="test.csv"',
      'Content-Type': 'text/csv'
    });
    buildCSV(res, csvHeadings, data)
    res.end()
  });
};

function buildHeadingsList(item) {
  var headings = [];
  var key;
  var locKey;
  var locValue;
  var value;

  headings = flatten(item, true);

  return headings;
}

function buildCSV(res, headings, data) {
  var results = data.d.results;
  var row;
  
  res.write('"' + headings.join('","') + '"\n');
  results.forEach(function(result) {
    row = flatten(result);
    res.write('"' + row.join('","') + '"\n');
  });
}

function flatten(result, useKeys) {
  var key;
  var locKey;
  var locValue;
  var value;
  var row = [];
 
  for (key in result) {
    value = result[key];
    if (key === 'locations') {
      for (locKey in key) {
        locValue = value[locKey];
        if (typeof locValue === 'object') continue;
        row.push(useKeys ? locKey : locValue);
      }
      continue;
    }
    if (typeof value === "object") continue;
    row.push(useKeys ? key : value);
  }

  return row;
}
