
module.exports = (sequelize, type) => {
    return sequelize.define('INGREDIENTS', {
        M_ID: {
            type: type.INTEGER,
            primaryKey: true,
            allowNull: false
         },
         MA_ID: {
            type: type.INTEGER,
            primaryKey: true,
            allowNull: false
         },
        count: {
            field: 'I_Count',
            type: type.FLOAT,
            allowNull: false
        }
        
    }, { timestamps: false, freezeTableName: true })
}

