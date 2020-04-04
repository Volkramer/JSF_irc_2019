const {
    Message,
    User,
    MessageUser
} = require('../../models')
const _ = require('lodash')

module.exports = {
    async index(req, res) {
        try {
            const messagesUser = await MessageUser.findAll({
                    include: [{
                            model: Message
                        },
                        {
                            model: User
                        }
                    ]
                })
                .map(messageUser => messageUser.toJSON())
                .map(messageUser => _.extend({},
                    messageUser.Message,
                    messageUser
                ))
            res.send(messagesUser)
        } catch (err) {
            res.status(500).send({
                err: 'An error has occured while trying to get the Messages Users'
            })
        }
    },
    async getMessagesUser(req, res) {
        try {
            const messagesUser = await MessageUser.findAll({
                    where: {
                        UserId: req.params.userId
                    },
                    include: [{
                            model: Message
                        },
                        {
                            model: User
                        }
                    ]
                })
                .map(messageUser => messageUser.toJSON())
                .map(messageUser => _.extend({},
                    messageUser.Message,
                    messageUser
                ))
            res.send(_.uniqBy(messagesUser, messageUser => messageUser.MessageId))
        } catch (err) {
            res.status(500).send({
                err: 'An error has occured while trying to get the Messages User'
            })
        }
    },
    async post(req, res) {
        try {
            const { MessageId, UserId } = req.body
            const messageUser = await MessageUser.create({
                MessageId: MessageId,
                UserId: UserId
            })
            res.send(messageUser)
        } catch (err) {
            res.status(500).send({
                err: 'An error has occured while trying to create the message for the user'
            })
        }
    },
    async delete(req, res) {
        try {
            const { messageUserId } = req.params

            const messageuser = await MessageUser.findOne({
                where: {
                    id: messageUserId
                }
            })
            if (!messageuser) {
                return res.status(403).send({
                    error: 'you do not have access to this vlabuser'
                })
            }
            await messageuser.destroy()
            res.send(messageuser)
        } catch (err) {
            res.status(500).send({
                err: 'An error has occured while trying to delete the message User'
            })
        }
    }
}