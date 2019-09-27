module.exports = (sequelize, type) => {
    return sequelize.define('EMPLOYEES', {
        id: {
            field: 'E_ID',
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            field:'E_Name',
            type: type.STRING,
            allowNull: false
        },
        fullName: {
            field: 'E_FullName',
            type: type.STRING
        },
        position: {
            field:'E_Position',
            type: type.STRING
         
        },
       gender: {
            field:'E_Gender',
            type: type.STRING
         
        }
    }, { timestamps: false, freezeTableName: true })
}