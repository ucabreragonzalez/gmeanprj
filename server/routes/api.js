const express = require('express');
const router = express.Router();
const MySqlClient = require('mysql');

// Connect
const connection = 
MySqlClient.createConnection({
    host: '172.30.13.90',
    user: 'mysqldb_user',
    password: 'mysqldb_pass',
    database: 'mean_db',
    port: 3306
  });

// Error handling
const sendError = (err, res) => {
    response.status = 501;
    response.message = typeof err == 'object' ? err.message : err;
    res.status(501).json(response);
};

// Response handling
let response = {
    status: 200,
    data: [],
    status: [],
    message: null
};

// Get users
router.get('/users', (req, res) => {
    
    connection.query('call get_users();', function(err, results) {
        if (err) throw err
        console.log(results[0].map((user) => user.username ));
        console.log(results);
        // response.data = results[0].map((user) => user.username );
        response.data = results[0];
        response.status = results[1];
        res.setHeader('Access-Control-Allow-Origin', '*');

        res.json(response);
      })
});

module.exports = router;