
module.exports = (sequelize, type) => {
    return sequelize.define('TABLE_DETAILS', {
        id: {
            field : 'TD_ID',
            type : type.INTEGER,
            primaryKey:true,
            autoIncrement: true
        },
        position: {
            field:'TD_Position',
            type: type.STRING
        }
       
    }, { timestamps: false, freezeTableName: true })
}