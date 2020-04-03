module.exports = (sequelize, DataTypes) => {
    const Channel = sequelize.define('Channel', {
        name: {
            type: DataTypes.STRING,
            unique: true // really important for one data / no more
        },
        createAt: DataTypes.STRING,
    })

    return Channel
}