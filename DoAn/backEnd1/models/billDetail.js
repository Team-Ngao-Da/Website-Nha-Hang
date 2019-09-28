
module.exports = (sequelize, type) => {
    return sequelize.define('BILL_DETAILS', {
        B_ID: {
            type: type.INTEGER,
            primaryKey: true,
            allowNull: false
        },
        M_ID:{
            type: type.INTEGER,
            primaryKey: true,
            allowNull: false
         },
        count: {
            field:'BD_Count',
            type: type.INTEGER
            },
        price:{
            field:'BD_Price',
            type:type.FLOAT
        }
      
    }, { timestamps: false, freezeTableName: true })
}

