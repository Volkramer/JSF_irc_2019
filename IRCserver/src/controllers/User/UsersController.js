const { User } = require('../../models')
const crypto = require('crypto')

module.exports = {
    async index(req, res) {
        try {
            let users = null
            const search = req.query.search
            if (search) {
                users = await User.findAll({
                    where: {
                        username: search
                    }
                })
            } else {
                users = await User.findAll({
                    limit: 100
                })
            }
            res.send(users)
        } catch (err) {
            res.status(500).send({
                err: 'An error has occured while trying to fetch all the User'
            })
        }
    },
    async getUser(req, res) {
        try {
            const user = await User.findByPk(req.params.userId)
            if (!user) {
                return res.status(403).send({
                    error: 'The user does not exist'
                })
            }
            res.send(user)
        } catch (err) {
            res.status(500).send({
                err: 'An error has occured while trying to get the user'
            })
        }
    },
    async post(req, res) {
        try {
            const user = await User.create(req.body)
            const newUser = {
                admin: req.body.admin,
                username: req.body.username,
                password: "",
                active_hash: "",
                salt: "",
                createAt: new Date()
            }
            newUser.salt = crypto.randomBytes(16).toString(`hex`)
            newUser.active_hash = crypto.pbkdf2Sync(req.body.password, newUser.salt,
                1000, 64, `sha512`).toString(`hex`)
            await User.update(newUser, {
                where: {
                    id: user.id
                }
            })
            res.send(user)
        } catch (err) {
            res.status(500).send({
                error: 'An error has occured while trying to create a new user'
            })
        }
    },
    async delete(req, res) {
        try {
            const user = await User.findByPk(req.params.userId)
            if (!user) {
                return res.status(403).send({
                    error: 'The user does not exist'
                })
            }
            await user.destroy()
            res.send(user)
        } catch (err) {
            res.status(500).send({
                error: 'An error has occured while trying to delete the user'
            })
        }
    },
    async put(req, res) {
        try {
            const user = await User.update(req.body, {
                where: {
                    id: req.params.userId
                }
            })
            res.send(user)
        } catch (err) {
            res.status(500).send({
                err: 'An error has occured while trying to update the user'
            })
        }
    }
}