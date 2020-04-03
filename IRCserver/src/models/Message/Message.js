module.exports = (sequelize, DataTypes) => {
    const Message = sequelize.define('Message', {
        userId: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        },
        username: {
            type: DataTypes.STRING,
            defaultValue: null
        },
        message: DataTypes.STRING,
        createAt: DataTypes.STRING
    })

    return Message
}