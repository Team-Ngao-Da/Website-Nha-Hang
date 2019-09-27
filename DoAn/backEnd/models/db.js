const Sequelize = require('sequelize');
const BillModel = require('./bill');
const BillDetailModel = require('./bill_detail');
const CancelMaterialModel = require('./cancel_material');
const EmployeeModel = require('./employee');
const IngredientModel = require('./ingredient');
const MaterialTypeModel = require('./material_type.js');
const MaterialModel = require('./material');
const MenuTypeModel = require('./menu_types');
const MenuModel = require('./menu');
const OrderModel = require('./order');
const PromoteModel = require('./promote');
const TableDetailModel = require('./table_detail');
const UserModel = require('./user');



const sequelize = new Sequelize('backend', 'sa', '12345', {
    dialect: 'mssql',
    host: 'localhost',
    dialectOptions: {
      options: {
          instanceName: 'SQLEXPRESS'
      }
    },
    pool: {  max: 20,  min: 0,  acquire: 30000,  idle: 10000  },
    logging: true
});


const BillDetail = BillDetailModel(sequelize,Sequelize);
const Bill = BillModel(sequelize,Sequelize);
const CancelMaterial = CancelMaterialModel(sequelize,Sequelize);
const Ingredient = IngredientModel(sequelize,Sequelize);
const MaterialType = MaterialTypeModel(sequelize,Sequelize);
const Material = MaterialModel(sequelize,Sequelize);
const Menu = MenuModel(sequelize,Sequelize);
const MenuType = MenuTypeModel(sequelize,Sequelize);
const Employee = EmployeeModel(sequelize,Sequelize);
const Order = OrderModel(sequelize,Sequelize);
const Promote = PromoteModel(sequelize,Sequelize);
const TableDetail =TableDetailModel(sequelize,Sequelize);
const User = UserModel(sequelize, Sequelize);

// cap3
Menu.belongsTo(MenuType, {foreignKey: 'MT_ID', as: 'menuType'});
MenuType.hasMany(Menu, {foreignKey: 'MT_ID', as: 'menus'});
//cap2
Promote.belongsTo(Menu, {foreignKey: 'M_ID', as: 'menus'});
Menu.hasMany(Promote, {foreignKey: 'M_ID', as: 'promote'});
//cap 4
Order.belongsTo(Menu, {foreignKey: 'M_ID', as: 'menus'});
Order.belongsTo(TableDetail,{foreignKey:'TD_ID', as:'tableDetails'});
Menu.hasMany(Order, {foreignKey: 'M_ID', as: 'order'});
TableDetail.hasMany(Order, {foreignKey: 'TD_ID', as: 'order'});
//cap 5
Material.belongsTo(MaterialType, {foreignKey: 'MA_T_ID', as: 'materialType'});
MaterialType.hasMany(Material, {foreignKey: 'MA_T_ID', as: 'materials'});
//cap 6
Ingredient.belongsTo(Menu, {foreignKey: 'M_ID', as: 'menus'});
Ingredient.belongsTo(Material,{foreignKey:'MA_ID', as:'materials'});
Menu.hasMany(Ingredient, {foreignKey: 'M_ID', as: 'ingredients'});
Material.hasMany(Ingredient, {foreignKey: 'MA_ID', as: 'ingredients'});
//cap 7
CancelMaterial.belongsTo(Employee, {foreignKey: 'E_ID', as: 'employees'});
CancelMaterial.belongsTo(MenuType,{foreignKey:'MT_ID', as:'menuTypes'});
Employee.hasMany(CancelMaterial, {foreignKey: 'E_ID', as: 'cancelMaterials'});
MenuType.hasMany(CancelMaterial, {foreignKey: 'MT_ID', as: 'cancelMaterials'});
//cap 8
BillDetail.belongsTo(Bill,{foreignKey:'B_ID', as:'bills'});
BillDetail.belongsTo(Menu, {foreignKey: 'M_ID', as: 'menus'});
Bill.hasMany(BillDetail, {foreignKey: 'B_ID', as: 'billDetails'});
Menu.hasMany(BillDetail, {foreignKey: 'M_ID', as: 'billDetails'});
//cap 9
Bill.belongsTo(Employee, {foreignKey: 'E_ID', as: 'employee'});
Employee.hasMany(Bill, {foreignKey: 'E_ID', as: 'bills'});


// only run once, then comment out
// sequelize.sync({ force: true }).then(() => {
//     console.log(`Database & tables created!`)
// });

module.exports = {
  User,
  MenuType,
  TableDetail,
  Menu,
  Promote,
  Order,
  Material,
  MaterialType,
  Ingredient,
  Employee,
  Bill,
  BillDetail,
  CancelMaterial
}


