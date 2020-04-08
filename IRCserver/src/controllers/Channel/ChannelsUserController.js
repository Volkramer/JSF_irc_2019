const { Channel, User, ChannelUser } = require('../../models')
const _ = require('lodash')

module.exports = {
    async index(req, res) {
        try {
            const channelsUser = await ChannelUser.findAll({
                include: [
                    {
                        model: User,
                    },
                    {
                        model: Channel,
                    },
                ],
            })
                .map((channelUser) => channelUser.toJSON())
                .map((channelUser) =>
                    _.extend({}, channelUser.Channel, channelUser)
                )
            res.send(channelsUser)
        } catch (err) {
            res.status(500).send({
                err:
                    'An error has occured while trying to get the channels users',
            })
        }
    },
    async getChannelUsers(req, res) {
        try {
            const channelUsers = await ChannelUser.findAll({
                where: {
                    ChannelId: req.params.channelId,
                },
                include: [
                    {
                        model: User,
                    },
                    {
                        model: Channel,
                    },
                ],
            })
                .map((channelUser) => channelUser.toJSON())
                .map((channelUser) =>
                    _.extend({}, channelUser.Channel, channelUser)
                )
            res.send(
                _.uniqBy(channelUsers, (channelUser) => channelUser.UserId)
            )
        } catch (err) {
            res.status(500).send({
                err:
                    'An error has occured while trying to get the channel users',
            })
        }
    },
    async getUserChannels(req, res) {
        try {
            const userChannels = await ChannelUser.findAll({
                where: {
                    UserId: req.params.userId,
                },
                include: [
                    {
                        model: Channel,
                    },
                ],
            })
                .map((channelUser) => channelUser.toJSON())
                .map((channelUser) =>
                    _.extend({}, channelUser.Channel, channelUser)
                )
            res.send(
                _.uniqBy(userChannels, (channelUser) => channelUser.ChannelId)
            )
        } catch (err) {
            res.status(500).send({
                err:
                    'An error has occured while trying to get the user Channels',
            })
        }
    },
    async post(req, res) {
        try {
            const { ChannelId, UserId } = req.body
            const channelUser = await ChannelUser.create({
                ChannelId: ChannelId,
                UserId: UserId,
            })
            res.send(channelUser)
        } catch (err) {
            res.status(500).send({
                err:
                    'An error has occured while trying to create the channel for the user',
            })
        }
    },
    async delete(req, res) {
        try {
            const { channelUserId } = req.params

            const channeluser = await ChannelUser.findOne({
                where: {
                    id: channelUserId,
                },
            })
            if (!channeluser) {
                return res.status(403).send({
                    error: 'you do not have access to this channel user',
                })
            }
            await channeluser.destroy()
            res.send(channeluser)
        } catch (err) {
            res.status(500).send({
                err:
                    'An error has occured while trying to delete the channel user',
            })
        }
    },
}
