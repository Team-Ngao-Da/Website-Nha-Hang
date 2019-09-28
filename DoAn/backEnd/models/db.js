const Sequelize = require('sequelize');
const BillModel = require('./bill');
// const BillDetailModel = require('./bill_detail');
const CancelMaterialModel = require('./cancel_material');
const EmployeeModel = require('./employee');
const IngredientModel = require('./ingredient');
const MaterialTypeModel = require('./material_type');
const MaterialModel = require('./material');
const MenuTypeModel = require('./menu_types');
const MenuModel = require('./menu');
const OrderModel = require('./order');
const PromoteModel = require('./promote');
const TableDetailModel = require('./table_detail');
const UserModel = require('./user');



const sequelize = new Sequelize('backend', 'sa', '1234', {
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


const User = UserModel(sequelize, Sequelize);
const Employee = EmployeeModel(sequelize, Sequelize);
const MaterialType = MaterialTypeModel(sequelize,Sequelize);
const Material = MaterialModel(sequelize, Sequelize);
const MenuType = MenuTypeModel(sequelize, Sequelize);
const Menu = MenuModel(sequelize, Sequelize);
const Ingredient = IngredientModel(sequelize, Sequelize);
const Bill = BillModel(sequelize,Sequelize);
// const BilDetail = BillDetailModel(sequelize, Sequelize);
const Promote = PromoteModel(sequelize,Sequelize);
const TableDetail = TableDetailModel(sequelize,Sequelize);
const Order = OrderModel(sequelize,Sequelize);
const CancelMaterial = CancelMaterialModel(sequelize,Sequelize);

User.belongsTo(Employee, {foreignKey: 'E_ID', as: 'employee'});
Employee.hasMany(User, {foreignKey: 'E_ID', as: 'user'});

Bill.belongsTo(Employee, {foreignKey: 'E_ID', as: 'employee'});
Employee.hasMany(Bill, {foreignKey: 'E_ID', as: 'bills'});

Material.belongsTo(MaterialType, {foreignKey: 'MA_T_ID', as: 'materialType'});
MaterialType.hasMany(Material, {foreignKey: 'MA_T_ID', as: 'material'});

Menu.belongsTo(MenuType, {foreignKey: 'MT_ID', as: 'menuType'});
MenuType.hasMany(Menu, {foreignKey: 'MT_ID', as: 'menu'});

Promote.belongsTo(Menu, {foreignKey: 'M_ID', as: 'menu'});
Menu.hasMany(Promote, {foreignKey: 'M_ID', as: 'promote'});

CancelMaterial.belongsTo(Menu, {foreignKey: 'M_ID', as: 'menu'});
Menu.hasMany(CancelMaterial, {foreignKey: 'M_ID', as: 'cancelMaterial'});
CancelMaterial.belongsTo(Employee, {foreignKey: 'E_ID', as: 'employee'});
Employee.hasMany(CancelMaterial, {foreignKey: 'E_ID', as: 'cancelMaterial'});

Order.belongsTo(Menu, {foreignKey: 'M_ID', as: 'menu'});
Menu.hasMany(Order, {foreignKey: 'M_ID', as: 'order'});
Order.belongsTo(TableDetail, {foreignKey: 'TD_ID', as: 'tableDetail'});
TableDetail.hasMany(Order, {foreignKey: 'TD_ID', as: 'order'});

Ingredient.belongsTo(Menu, {foreignKey: 'M_ID', as: 'menu'});
Menu.hasMany(Ingredient, {foreignKey: 'M_ID', as: 'ingredient'});
Ingredient.belongsTo(Material, {foreignKey: 'MA_ID', as: 'material'});
Material.hasMany(Ingredient, {foreignKey: 'MA_ID', as: 'ingredient'});

// BilDetail.belongsTo(Bill, {foreignKey: 'B_ID', as: 'bill'});
// Bill.hasMany(BilDetail, {foreignKey: 'B_ID', as: 'billDetail'});
// BilDetail.belongsTo(Menu, {foreignKey: 'M_ID', as: 'menu'});
// Menu.hasMany(BilDetail, {foreignKey: 'M_ID', as: 'billDetail'});


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
  // BillDetail,
  CancelMaterial
}


