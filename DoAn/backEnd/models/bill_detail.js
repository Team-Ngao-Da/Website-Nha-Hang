module.exports = (sequelize, type) => {
    return sequelize.define('BILL_DETAILS', {
      
        B_ID:{
            type: type.INTEGER,
            allowNull: false
         },
        M_ID:{
            type: type.INTEGER,
            allowNull: false
         },
        count: {
            field:'BD_Count',
             type: type.DATE
            },
        price:{
            field:'BD_Price',
            type:type.FLOAT
        }
      
    }, { timestamps: false, freezeTableName: true })
}
