module.exports = (sequelize, type) => {
    return sequelize.define('MATERIALS', {
        id: {
            field: 'MA_ID',
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
            MA_T_ID:{
            type: type.INTEGER,
            allowNull: false 
        },
        name: { 
            field: 'MA_Name',
            type: type.STRING,
             allowNull: false 
            },
        supplie:{
            field:  'MA_Supplie',
            type:type.STRING,

        } ,
        unit:{
            field: 'MA_Unit',
            type:type.STRING,

        },
        count:{
            field: "MA_Count",
            type:type.INTEGER
        },
        cost:{
            field: 'MA_Cost',
            type: type.FLOAT
        },
        expirationDate:{
            field: 'MA_Expiration_Date',
            type:type.DATE
        },
        importDate:{
            field:'MA_Import_Date',
            type: type.DATE
        }
    }, { timestamps: false, freezeTableName: true })
}

