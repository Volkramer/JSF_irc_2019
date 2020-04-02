const {
  sequelize,
  User,
  Message,
  MessageUser,
  Resp,
  RespMessage
} = require('../src/models')

const Promise = require('bluebird')

const users = require('./User/users.json')

const messages = require('./Message/messages.json')
const messagesUsers = require('./Message/messagesUsers.json')
const resps = require('./Message/resps.json')
const respsMessages = require('./Message/respsMessage.json')

sequelize.sync({force: true})
  .then(async function () {

    /* ####################################################################### */
    /* USER */
    await Promise.all(
      users.map(user => {
        User.create(user)
      })
    )
/* ####################################################################### */
    /* MESSAGE */
    await Promise.all(
      messages.map(message => {
        Message.create(message)
      })
    )
    await Promise.all(
      messagesUsers.map(messagesUser => {
        MessageUser.create(messagesUser)
      })
    )
    /* RESP */
    await Promise.all(
      resps.map(resp => {
        Resp.create(resp)
      })
    )
    await Promise.all(
      respsMessages.map(respsMessage => {
        RespMessage.create(respsMessage)
      })
    )
  }