
module.exports = (sequelize, type) => {
    return sequelize.define('MENUS', {
        id: {
            field: 'M_ID',
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
       MT_ID:{
            type: type.INTEGER,
            allowNull: false
         },
        name: {
            field: 'M_Name',
            type: type.STRING,
            allowNull: false 
        },
        price:{
            field: 'M_Price',
            type:type.FLOAT
        },
        image: {
            field: 'M_Img',
            type: type.STRING,
        }
    }, { timestamps: false, freezeTableName: true })
}


