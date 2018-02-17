'use strict'

const { describe, it, beforeEach, afterEach } = require('mocha')
const Helper = require('hubot-test-helper')
const { expect } = require('chai')
const http = require('http')
const querystring = require('querystring')

const helper = new Helper('./../src/index.js')

describe('travis-ci', function () {
  beforeEach(() => {
    this.room = helper.createRoom({ name: 'random' })
  })

  afterEach(() => {
    this.room.destroy()
  })

  describe('POST /dokku/random', () => {
    beforeEach(done => {
      const postData = querystring.stringify({
        action: 'post-deploy',
        app: 'myapp',
        url: 'http://myapp.example.com'
      })
      const postOptions = {
        hostname: 'localhost',
        port: 8080,
        path: '/dokku/random',
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Content-Length': Buffer.byteLength(postData)
        }
      }
      this.room.robot.adapter.client = {
        web: {
          chat: {
            postMessage: (channel, text, options) => {
              this.postMessage = {
                channel,
                text,
                options
              }
              done()
            }
          }
        }
      }
      const req = http.request(postOptions, response => {
        this.response = response
      })
      req.write(postData)
      req.end()
    })

    it('responds with status 200 and results', () => {
      expect(this.postMessage.channel).to.eql('#random')
      expect(this.postMessage.text).to.be.a('null')
      expect(this.postMessage.options.as_user).to.eql(false)
      expect(this.postMessage.options.link_names).to.eql(1)
      expect(this.postMessage.options.username).to.eql('Dokku')
      expect(this.postMessage.options.icon_url).to.eql(
        'https://avatars1.githubusercontent.com/u/13455795?v=3&s=200'
      )
      expect(this.postMessage.options.attachments).to.eql([
        {
          color: 'good',
          fallback: 'myapp deployed, check http://myapp.example.com',
          text: 'myapp deployed, check http://myapp.example.com'
        }
      ])
    })
  })
})
