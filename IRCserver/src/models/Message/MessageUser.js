module.exports = (sequelize, DataTypes) => {
    const MessageUser = sequelize.define('MessageUser', {})

    MessageUser.associate = function(models) {
        MessageUser.belongsTo(models.Message)
        MessageUser.belongsTo(models.User)
    }
    return MessageUser
}