module.exports = (sequelize, DataTypes) => {
    const ChannelUser = sequelize.define('ChannelUser', {})

    ChannelUser.associate = function(models) {
        ChannelUser.belongsTo(models.Channel)
        ChannelUser.belongsTo(models.User)
    }
    return ChannelUser
}