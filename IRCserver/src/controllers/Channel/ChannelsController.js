const { Channel } = require('../../models')
const _ = require('lodash')
module.exports = {
    async index(req, res) {
        try {
            const value = req.query.value
            if (value == 1) {
                channels = await Channel.findAll({
                    where: {
                        faq: true
                    }
                })
            } else if (value == 2) {
                channels = await Channel.findAll({
                    where: {
                        user: true
                    }
                })
            }
            res.send(_.uniqBy(channels))
        } catch (err) {
            res.status(500).send({
                err: 'An error has occured while trying to fetch all the Message'
            })
        }
    },
    async getChannel(req, res) {
        try {
            const channel = await Channel.findByPk(req.params.channelId)
            if (!channel) {
                return res.status(403).send({
                    error: 'The channel does not exist'
                })
            }
            res.send(channel)
        } catch (err) {
            res.status(500).send({
                error: 'An error has occured while trying to get the channel'
            })
        }
    },
    async post(req, res) {
        try {
            const channel = await Channel.create(req.body)
            res.send(channel)
        } catch (err) {
            res.status(500).send({
                error: 'An error has occured while trying to create a new channel'
            })
        }
    },
    async delete(req, res) {
        try {
            const channel = await Channel.findByPk(req.params.channelId)
            if (!channel) {
                return res.status(403).send({
                    error: 'The message does no exist'
                })
            }
            await channel.destroy()
            res.send(message)
        } catch (err) {
            res.status(500).send({
                err: 'An error has occured while trying to delete the Vlab User'
            })
        }
    }
}