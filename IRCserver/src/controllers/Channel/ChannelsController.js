const { Channel } = require('../../models')
const _ = require('lodash')

module.exports = {
    async index(req, res) {
        try {
            let channels = null
            const search = req.query.search
            if (search) {
                channels = await Channel.findAll({
                    where: {
                        username: search
                    }
                })
            } else {
                channels = await Channel.findAll({
                    limit: 100
                })
            }
            res.send(channels)
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
            res.send(channel)
        } catch (err) {
            res.status(500).send({
                err: 'An error has occured while trying to delete the Vlab User'
            })
        }
    },
    async update(req, res) {
        try {
            const channel = await Channel.update(req.body, {
                where: {
                    id: req.params.channelId
                }
            })
            res.send(channel)
        } catch (err) {
            res.status(500).send({
                err: 'An error has occured while trying to update the user'
            })
        }
    }
}