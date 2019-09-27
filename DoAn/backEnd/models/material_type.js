module.exports = (sequelize, type) => {
    return sequelize.define('MATERIAL_TYPES', {
        id: {
            field : 'MA_T_ID',
            type : type.INTEGER,
            primaryKey:true,
            autoIncrement: true
        },

        
        name: {
            field:'MA_T_Name',
            type: type.STRING
            
        }
       
    }, { timestamps: false, freezeTableName: true })
}