
module.exports = (sequelize, type) => {
    return sequelize.define('USERS', {
        id: {
            field: 'U_ID',
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        E_ID: { type: type.INTEGER, allowNull: false},
        userName: {
            field: 'U_UserName',
            type: type.STRING,
            allowNull: false
        },
        password: {
            field: 'U_Password',
            type: type.STRING,
            allowNull: false
        }
        
    }, { timestamps: false, freezeTableName: true})
}