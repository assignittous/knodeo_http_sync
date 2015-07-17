var parseString, request, xmlLite;

request = require('sync-request');

parseString = require('xml2js').parseString;

xmlLite = require("node-xml-lite");

exports.httpSync = {
  objectify: function(response) {
    var body, obj;
    body = response.body.toString('utf8');
    obj = JSON.parse(body);
    return obj;
  },
  objectifyXml: function(response) {
    var body, object;
    body = response.body.toString('utf8');
    object = xmlLite.parseString(body);
    return object;
  },
  get: function(url, options) {
    var response;
    response = request("get", url, options);
    return response.body.toString('utf8');
  },
  getObject: function(url, options, attribute) {
    var response, that;
    response = request("get", url, options);
    that = this;
    if (attribute != null) {
      return that.objectify(response[attribute]);
    } else {
      return that.objectify(response);
    }
  },
  getXml: function(url, options, attribute) {
    var body, callback, outputObject, response, that;
    response = request("get", url, options);
    body = response.body.toString('utf8');
    that = this;
    outputObject = {};
    callback = function() {
      return that.outputObject;
    };
    return parseString(body, function(err, result) {
      if (err != null) {
        console.log("XMLJS ERROR");
      } else {
        that.outputObject = result;
        return callback();
      }
    });
  }
};
