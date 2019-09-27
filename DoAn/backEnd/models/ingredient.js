module.exports = (sequelize, type) => {
    return sequelize.define('INGREDIENTS', {
      
        M_ID:{
            type: type.INTEGER,
            allowNull: false
         },
          MA_ID:{
            type: type.INTEGER,
         },
       count: {
            field: 'I_Count',
             type: type.FLOAT
         
        }
        
    }, { timestamps: false, freezeTableName: true })
}

