request = require('sync-request')
parseString = require('xml2js').parseString
xmlLite = require("node-xml-lite")


exports.httpSync =

  objectify: (response)->
    body = response.body.toString('utf8')
    obj = JSON.parse(body)
    return obj

  objectifyXml: (response)->
    body = response.body.toString('utf8')
    object = xmlLite.parseString(body)
    return object

  get: (url, options)->
    response = request "get", url, options
    return response.body.toString('utf8')


  getObject: (url, options, attribute)->
    response = request "get", url, options
    that = @
    if attribute?
      return that.objectify(response[attribute])
    else
      return that.objectify(response)

  getXml: (url, options, attribute)->
    response = request "get", url, options
    body = response.body.toString('utf8')
    that = @
    outputObject = {}
    callback = ()->
      return that.outputObject


    parseString body, (err, result)->
      if err?
        console.log "XMLJS ERROR"
        return
      else
        that.outputObject = result
        callback()


