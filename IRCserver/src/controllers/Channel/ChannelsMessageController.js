const {
    Channel,
    ChannelMessage,
    Message
} = require('../../models')
const _ = require('lodash')

module.exports = {
    async index(req, res) {
        try {
            const channelsMessages = await ChannelMessage.findAll({
                    include: [{
                            model: Channel
                        },
                        {
                            model: Message
                        }
                    ]
                })
                .map(channelMessage => channelMessage.toJSON())
                .map(channelMessage => _.extend({},
                    channelMessage.Channel,
                    channelMessage
                ))
            res.send(channelsMessages)
        } catch (err) {
            res.status(500).send({
                err: 'An error has occured while trying to get the channels messages'
            })
        }
    },
    async getChannelMessages(req, res) {
        try {
            const channelMessages = await ChannelMessage.findAll({
                    where: {
                        ChannelId: req.params.channelId
                    },
                    include: [{
                            model: Channel
                        },
                        {
                            model: Message
                        }
                    ]
                })
                .map(channelMessage => channelMessage.toJSON())
                .map(channelMessage => _.extend({},
                    channelMessage.Channel,
                    channelMessage
                ))
            res.send(channelMessages)
        } catch (err) {
            res.status(500).send({
                err: 'An error has occured while trying to get the channel messages'
            })
        }
    },
    async post(req, res) {
        try {
            const { ChannelId, MessageId } = req.body
            const channelMessage = await ChannelMessage.create({
                ChannelId: ChannelId,
                MessageId: MessageId
            })
            res.send(channelMessage)
        } catch (err) {
            res.status(500).send({
                err: 'An error has occured while trying to create the message for the channel'
            })
        }
    },
    async delete(req, res) {
        try {
            const { channelMessageId } = req.params

            const channelmessage = await ChannelMessage.findOne({
                where: {
                    id: channelMessageId
                }
            })
            if (!channelmessage) {
                return res.status(403).send({
                    error: 'you do not have access to this channel message'
                })
            }
            await channelmessage.destroy()
            res.send(channelmessage)
        } catch (err) {
            res.status(500).send({
                err: 'An error has occured while trying to delete the channel message'
            })
        }
    }
}