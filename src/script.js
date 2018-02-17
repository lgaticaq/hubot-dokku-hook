// Description
//   Get Dokku deploy notification
//
// Dependencies:
//   None
//
// Configuration:
//   None
//
// Commands:
//   None
//
// Author:
//   lgaticaq

'use strict'

const icon = 'https://avatars1.githubusercontent.com/u/13455795?v=3&s=200'

module.exports = robot => {
  robot.router.post('/dokku/:room', (req, res) => {
    const channel = req.params.room
    res.send('Ok')
    if (req.body.action === 'post-deploy') {
      const message = `${req.body.app} deployed, check ${req.body.url}`
      const attachments = {
        as_user: false,
        link_names: 1,
        icon_url: icon,
        username: 'Dokku',
        unfurl_links: false,
        attachments: [
          {
            fallback: message,
            color: 'good',
            text: message
          }
        ]
      }
      if (['SlackBot', 'Room'].includes(robot.adapter.constructor.name)) {
        return robot.adapter.client.web.chat.postMessage(
          `#${channel}`,
          null,
          attachments
        )
      }
      robot.messageRoom(channel, message)
    }
  })
}
