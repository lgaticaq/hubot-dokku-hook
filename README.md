# hubot-dokku-hook

[![npm version](https://img.shields.io/npm/v/hubot-dokku-hook.svg?style=flat-square)](https://www.npmjs.com/package/hubot-dokku-hook)
[![npm downloads](https://img.shields.io/npm/dm/hubot-dokku-hook.svg?style=flat-square)](https://www.npmjs.com/package/hubot-dokku-hook)
[![Build Status](https://img.shields.io/travis/lgaticaq/hubot-dokku-hook.svg?style=flat-square)](https://dokku.org/lgaticaq/hubot-dokku-hook)
[![Coverage Status](https://img.shields.io/coveralls/lgaticaq/hubot-dokku-hook/master.svg?style=flat-square)](https://coveralls.io/github/lgaticaq/hubot-dokku-hook?branch=master)
[![Code Climate](https://img.shields.io/codeclimate/github/lgaticaq/hubot-dokku-hook.svg?style=flat-square)](https://codeclimate.com/github/lgaticaq/hubot-dokku-hook)
[![dependency Status](https://img.shields.io/david/lgaticaq/hubot-dokku-hook.svg?style=flat-square)](https://david-dm.org/lgaticaq/hubot-dokku-hook#info=dependencies)
[![devDependency Status](https://img.shields.io/david/dev/lgaticaq/hubot-dokku-hook.svg?style=flat-square)](https://david-dm.org/lgaticaq/hubot-dokku-hook#info=devDependencies)

> Get Dokku deploy notification

## Install

```bash
npm i -S hubot-dokku-hook
```

Add `["hubot-dokku-hook"]` in `external-scripts.json`.

Install [dokku-webhooks](https://github.com/nickstenning/dokku-webhooks) in your dokku and set the webhook with:

```bash
dokku webhooks:add http://hubot.example.com/dokku/room-name
```

Replace `room-name` with the slack or hubot channel

![notification](http://pix.toile-libre.org/upload/original/1489525873.png)

## License

[MIT](https://tldrlegal.com/license/mit-license)
