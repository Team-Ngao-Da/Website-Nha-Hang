
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
app.use('/employees', require('./controllers/employees'));
app.use('/materialTypes', require('./controllers/materialTypes'));
app.use('/materials', require('./controllers/materials'));
app.use('/menuTypes', require('./controllers/menuTypes'));
app.use('/menus', require('./controllers/menus'));
app.use('/ingredients', require('./controllers/ingredients'));
app.use('/bills', require('./controllers/bills'));
app.use('/billDetails', require('./controllers/billDetails'));
app.use('/promotes', require('./controllers/promotes'));
app.use('/tableDetails', require('./controllers/tableDetails'));
app.use('/orders', require('./controllers/orders'));
app.use('/cancelMaterials', require('./controllers/cancelMaterials'));

// invalid Url
app.use((req, res) => {
    return res.status(404).send(ErrorResult(404, 'Api Not Found!'));
});

const server = app.listen(3000, () => {
    const host = server.address().address;
    const port = server.address().port;
    console.log('Server is running at http://%s:%s', host, port);
});