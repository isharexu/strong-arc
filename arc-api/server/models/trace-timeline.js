module.exports = function(TraceTimeline) {
  var request = require('request');
  var http = require("http");
  var zlib = require("zlib");

  TraceTimeline.fetchTimeLine = function (reqparams, cb) {

    var urlString = 'http://localhost:8103/get_raw_memory_pieces/' + reqparams.project + '/' + reqparams.host + '/' + reqparams.pid;

    function getGzipped(url, callback) {
      // buffer to store the streamed decompression
      var buffer = [];

      http.get(url, function (res) {
        // pipe the response into the gunzip to decompress
        var gunzip = zlib.createGunzip();
        res.pipe(gunzip);

        gunzip.on('data', function (data) {
          // decompression chunk ready, add it to the buffer
          buffer.push(data.toString())

        }).on("end", function () {
          // response and decompression complete, join the buffer and return
          callback(null, buffer.join(""));

        }).on("error", function (e) {
          callback(e);
        })
      }).on('error', function (e) {
        callback(e)
      });
    }

    getGzipped(urlString, function (err, data) {
     // console.log('|    DATA   | ----------   | ' + data);
      cb(null, data);
    });



  };


  TraceTimeline.remoteMethod(
    'fetchTimeLine',
    {
      accepts: {arg: 'reqparams', type: 'object'},
      returns: {arg: 'data', type: 'string'},
      http: {verb: 'get'}
    }
  );
};