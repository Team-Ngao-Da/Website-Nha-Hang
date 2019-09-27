module.exports = (sequelize, type) => {
    return sequelize.define('MENU_TYPES', {
        id: {
            field : 'MT_ID',
            type : type.INTEGER,
            primaryKey:true,
            autoIncrement: true
        },
        
        name: {
            field:'MT_Name',
            type: type.STRING
            
        }
       
    }, { timestamps: false, freezeTableName: true })
}