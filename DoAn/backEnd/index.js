const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { ErrorResult } = require('./utils/base_response');
const app = express();

app.use(cors({
    methods: ['OPTIONS', 'GET', 'POST', 'PUT', 'PATCH', 'DELETE']
}));

// const auth = require('./middleware/auth');
// app.use(auth);
// app.use(express.static(path.join(__dirname, 'public')))
app.use('/img', express.static(__dirname+'/data'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use('/users', require('./controllers/users'));
const menuTypeCtrl = require('./controllers/menu_types');
app.use('/menuTypes', menuTypeCtrl);
const menuCtrl = require('./controllers/menus');
app.use('/menus',menuCtrl);
const tableDetailCtrl = require('./controllers/table_details');
app.use('/tableDetails',tableDetailCtrl);
const promoteCtrl = require('./controllers/promotes');
app.use('/promotes',promoteCtrl);
const materialCtrl = require('./controllers/materials');
app.use('/materials',materialCtrl);
const materialTypeCtrl = require('./controllers/material_types');
app.use('/materialTypes',materialTypeCtrl);
const employeeCtrl = require('./controllers/employees');
app.use('/employees',employeeCtrl);
const billCtrl = require('./controllers/bills');
app.use('/bills',billCtrl);
const billDetailCtrl = require('./controllers/bill_detail');
app.use('/billDetails',billDetailCtrl);
const orderCtrl = require('./controllers/order')
app.use('/orders',orderCtrl);

// invalid Url
app.use((req, res) => {
    return res.status(404).send(ErrorResult(404, 'Api Not Found!'));
});

const server = app.listen(8081, () => {
    const host = server.address().address;
    const port = server.address().port;
    console.log('Server is running at http://%s:%s', host, port);
});


