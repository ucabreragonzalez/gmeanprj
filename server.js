const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mysql = require('mysql');
 
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

// connection configurations
// const mc = mysql.createConnection({
//     host: 'localhost',
//     user: 'root',
//     password: 'mariadb_root',
//     database: 'test'
// });

const mc = mysql.createConnection({
host: '172.30.13.90',
user: 'mysqldb_user',
password: 'mysqldb_pass',
database: 'mean_db'
});
 
// default route
app.get('/', function (req, res) {
    return res.send({ error: true, message: 'hello' })
});

// connect to database
// mc.connect();

// Retrieve all todos 
app.get('/todos', function (req, res) {
    mc.query('call get_users()', function (error, results, fields) {
        if (error) throw error;
        return res.send({ error: false, data: results, message: 'Todos list.' });
    });
});

// Add a new todo  
app.post('/todo', function (req, res) {
 
    let task = req.body.username;
    let correo = req.body.correo;
 
    if (!task) {
        return res.status(400).send({ error:true, message: 'Please provide user' });
    }

    mc.query("insert into t_users set ? ", { username: task, email: correo }, function (error, results, fields) {
        if (error) throw error;
        return res.send({ error: false, data: results, message: 'New user has been created successfully.' });
    });
});

// all other requests redirect to 404
app.all("*", function (req, res, next) {
    return res.send('page not found');
    next();
});

// port must be set to 8080 because incoming http requests are routed from port 80 to port 8080
app.listen(8080, function () {
    console.log('Node app is running on port 8080');
});

// allows "grunt dev" to create a development server with livereload
module.exports = app;