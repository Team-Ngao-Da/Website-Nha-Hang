module.exports = (sequelize, type) => {
    return sequelize.define('ORDERS', {
        id: {
            field: 'O_ID',
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        M_ID :{
            type: type.INTEGER,
            allowNull: false
         },
        TD_ID:{
            type: type.INTEGER,
            allowNull: false
         },
        count: {
            field: 'O_Count',
            type: type.INTEGER
        }
        
    }, { timestamps: false, freezeTableName: true })
}

