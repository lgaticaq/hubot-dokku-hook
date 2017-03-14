path = require("path")
Helper = require("hubot-test-helper")
expect = require("chai").expect
http = require("http")
querystring = require("querystring")

helper = new Helper("./../src/index.coffee")

describe "travis-ci", ->
  beforeEach ->
    @room = helper.createRoom({name: "random"})

  afterEach ->
    @room.destroy()

  context "POST /dokku/random", ->
    beforeEach (done) ->
      postData = querystring.stringify
        action: "post-deploy"
        app: "myapp"
        url: "http://myapp.example.com"
      postOptions =
        hostname: "localhost"
        port: 8080
        path: "/dokku/random"
        method: "POST"
        headers:
          "Content-Type": "application/x-www-form-urlencoded"
          "Content-Length": Buffer.byteLength(postData)
      @room.robot.adapter.client =
        web:
          chat:
            postMessage: (channel, text, options) =>
              @postMessage =
                channel: channel
                text: text
                options: options
              done()
      req = http.request postOptions, (response) =>
        @response = response
      req.write(postData)
      req.end()

    it "responds with status 200 and results", ->
      expect(@postMessage.channel).to.eql("#random")
      expect(@postMessage.text).to.be.null
      expect(@postMessage.options.as_user).to.be.false
      expect(@postMessage.options.link_names).to.eql(1)
      expect(@postMessage.options.username).to.eql("Dokku")
      expect(@postMessage.options.icon_url).to.eql(
        "https://avatars1.githubusercontent.com/u/13455795?v=3&s=200")
      expect(@postMessage.options.attachments).to.eql [
        color: "good"
        fallback: "myapp deployed, check http://myapp.example.com"
        text: "myapp deployed, check http://myapp.example.com"
      ]
