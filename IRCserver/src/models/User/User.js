// const Bluebird = require('bluebird')
// const bcrypt = Bluebird.promisifyAll(require('bcrypt-nodejs')) // store password using bcrypt

module.exports = (sequelize, DataTypes) => {
    // creation of the table into the DB
    const User = sequelize.define('User', {
        username: {
            type: DataTypes.STRING,
            unique: true // really important for one data / no more
        },
        password: DataTypes.STRING,
        active_hash: DataTypes.STRING,
        salt: DataTypes.STRING,
        admin: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
    })

    return User
}