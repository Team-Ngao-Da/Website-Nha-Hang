module.exports = (sequelize, type) => {
    return sequelize.define('BILLS', {
        id: {
            field: 'B_ID',
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        E_ID:{
            type: type.INTEGER,
            allowNull: false
         },
        date: {
            field:'B_Date',
             type: type.DATE
            },
        payment:{
            field:'B_Payment',
            type:type.FLOAT
        }
      
    }, { timestamps: false, freezeTableName: true })
}

