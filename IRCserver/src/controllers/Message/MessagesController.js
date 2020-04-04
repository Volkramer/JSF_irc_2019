const { Message } = require('../../models')
const _ = require('lodash')
module.exports = {
    async index(req, res) {
        try {
            let messages = null
            const search = req.query.search
            if (search) {
                messages = await Message.findAll({
                    where: {
                        name: search
                    }
                })
            } else {
                messages = await Message.findAll({
                    limit: 100
                })
            }
            res.send(messages)
        } catch (err) {
            res.status(500).send({
                err: 'An error has occured while trying to fetch all the Message'
            })
        }
    },
    async getMessage(req, res) {
        try {
            const message = await Message.findByPk(req.params.messageId)
            if (!message) {
                return res.status(403).send({
                    error: 'The message does not exist'
                })
            }
            res.send(message)
        } catch (err) {
            res.status(500).send({
                error: 'An error has occured while trying to get the message'
            })
        }
    },
    async post(req, res) {
        try {
            const message = await Message.create(req.body)
            res.send(message)
        } catch (err) {
            res.status(500).send({
                error: 'An error has occured while trying to create a new message'
            })
        }
    },
    async delete(req, res) {
        try {
            const message = await Message.findByPk(req.params.messageId)
            if (!message) {
                return res.status(403).send({
                    error: 'The message does no exist'
                })
            }
            await message.destroy()
            res.send(message)
        } catch (err) {
            res.status(500).send({
                err: 'An error has occured while trying to delete the Vlab User'
            })
        }
    },
    async update(req, res) {
        try {
            const message = await Message.update(req.body, {
                where: {
                    id: req.params.messageId
                }
            })
            res.send(message)
        } catch (err) {
            res.status(500).send({
                err: 'An error has occured while trying to update the user'
            })
        }
    }
}