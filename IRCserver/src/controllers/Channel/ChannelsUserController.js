const {
    Channel,
    ChannelUser
} = require('../../models')
const _ = require('lodash')

module.exports = {
    async index(req, res) {
        try {
            const UserId = req.user.id
            const channelsUser = await ChannelUser.findAll({
                    where: {
                        UserId: UserId
                    },
                    include: [{
                        model: Message
                    }]
                })
                .map(channelUser => channelUser.toJSON())
                .map(channelUser => _.extend({},
                    channelUser.Channel,
                    channelUser
                ))
            res.send(_.uniqBy(channelsUser, channelUser => channelUser.MessageId))
        } catch (err) {
            res.status(500).send({
                err: 'An error has occured while trying to get the Message User'
            })
        }
    },
    async post(req, res) {
        try {
            const UserId = req.user.id
            const { ChannelId } = req.body
            const channelUser = await ChannelUser.create({
                ChannelId: ChannelId,
                UserId: UserId
            })
            res.send(channelUser)
        } catch (err) {
            res.status(500).send({
                err: 'An error has occured while trying to create the message for the user'
            })
        }
    },
    async delete(req, res) {
        try {
            const UserId = req.user.id
            const { channelUserId } = req.params

            const channeluser = await ChannelUser.findOne({
                where: {
                    id: channelUserId,
                    UserId: UserId
                }
            })
            if (!channeluser) {
                return res.status(403).send({
                    error: 'you do not have access to this vlabuser'
                })
            }
            await channeluser.destroy()
            res.send(channeluser)
        } catch (err) {
            res.status(500).send({
                err: 'An error has occured while trying to delete the message User'
            })
        }
    }
}