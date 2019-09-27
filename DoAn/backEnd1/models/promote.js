
module.exports = (sequelize, type) => {
    return sequelize.define('PROMOTES', {
        id: {
            field: 'P_ID',
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        M_ID:{
            type: type.INTEGER,
            allowNull: false
             },
        discount: {
            field: 'P_Discount',
            type: type.INTEGER
         },
        content:{
            field:'P_Content',
            type:type.STRING
        },
        dateStart:{
            field: 'P_Date_Start',
            type: type.DATE
        },
        dateEnd: {
            field: 'P_Date_End',
            type: type.DATE
        },
        
    }, { timestamps: false, freezeTableName: true })
}

