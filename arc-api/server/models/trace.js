module.exports = function(Trace) {
  var request = require('request');
  var http = require("http");
  var zlib = require("zlib");
  var util = require("util");


  Trace.fetchTrace = function(pfkey, cb) {

    var apiHost = 'http://localhost:8103/';
    //var apiHost = 'http://ec2-54-165-203-29.compute-1.amazonaws.com:8103/';
    var urlString = apiHost + 'get_raw_pieces/' + pfkey;

   // var urlString = 'http://localhost:8103/get_raw_pieces/' + pfkey;

    function getGzipped(url, callback) {
      // buffer to store the streamed decompression
      var buffer = [];

      http.get(url, function (res) {
        // pipe the response into the gunzip to decompress
        var gunzip = zlib.createGunzip();
        res.pipe(gunzip);

        gunzip.on('data', function (data) {
          // decompression chunk ready, add it to the buffer
          buffer.push(data);

        }).on("end", function () {
          // response and decompression complete, join the buffer and return
          var outputString = buffer.join("");

          callback(null, outputString);

        }).on("error", function (e) {
          callback(e);
        })
      }).on('error', function (e) {
        callback(e)
      });
    }

    getGzipped(urlString, function (err, data) {
      cb(null, data);
    });


  };


  Trace.remoteMethod(
    'fetchTrace',
    {
      accepts: {arg: 'pfkey', type: 'string'},
      returns: {arg: 'data', type: 'object'},
      http: {verb: 'get'}
    }
  );
};
