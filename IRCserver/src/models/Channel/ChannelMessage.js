module.exports = (sequelize, DataTypes) => {
    const ChannelMessage = sequelize.define('ChannelMessage', {})

    ChannelMessage.associate = function(models) {
        ChannelMessage.belongsTo(models.Channel)
        ChannelMessage.belongsTo(models.Message)
    }
    return ChannelMessage
}