
module.exports = (sequelize, type) => {
    return sequelize.define('TABLE_DETAILS', {
        MT_ID: {
            type: type.INTEGER,
            allowNull: false
        },
        E_ID: {
            type : type.INTEGER,
            allowNull: false
        },
        date: {
            field:'C_MA_Date',
            type: type.DATE
        },
        reason: {
            field: 'C_MA_Reason',
            type: type.STRING
        },
        count: {
            field: 'C_MA_Count',
            type: type.INTEGER
        }
       
    }, { timestamps: false, freezeTableName: true })
}