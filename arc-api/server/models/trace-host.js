module.exports = function(TraceHost) {
  var request = require('request');
  var http = require("http");
  var zlib = require("zlib");

  TraceHost.fetchHosts = function(reqparams, cb) {

    var project = 'wfp:helloworld';  // get this from url
    //var project = reqparams.project;
    var apiHost = 'http://localhost:8103/';
   // var apiHost = 'http://ec2-54-165-203-29.compute-1.amazonaws.com:8103/';
    var urlString = apiHost + 'get_host_pid_list/' + project;
    //  var url = this.base + path.join('get_host_pid_list', this.project)
    // cb = cb || function(data){}



    function getGzipped(url, callback) {
      // buffer to store the streamed decompression
      var buffer = [];

      http.get(url, function(res) {
        // pipe the response into the gunzip to decompress
        var gunzip = zlib.createGunzip();
        res.pipe(gunzip);

        gunzip.on('data', function(data) {
          // decompression chunk ready, add it to the buffer
          buffer.push(data.toString())

        }).on("end", function() {
          // response and decompression complete, join the buffer and return
          callback(null, buffer.join(""));

        }).on("error", function(e) {
          callback(e);
        })
      }).on('error', function(e) {
        callback(e)
      });
    }

    getGzipped(urlString, function(err, data) {
      //console.log('|    DATA   | ----------   | ' + data);
      cb(null, data);
    });


  };

  TraceHost.remoteMethod(
    'fetchHosts',
    {
      accepts: {arg: 'reqparams', type: 'object'},
      returns: {arg: 'data', type: 'string'},
      http: {verb: 'get'}
    }
  );


};
