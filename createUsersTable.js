const express = require('express');
const app = express();
const sql = require('mssql');
const bodyParser = require('body-parser');

const config = {
    user: 'testnode1',
    password: 'Bt1f-Fth?zV7',
    server: 'den1.mssql5.gear.host',
    database: 'testnode1'
};

const pool = new sql.ConnectionPool(config);

pool.connect((err) => {
    //console.log("pool", pool);
    //console.log(err);
    // const request = new sql.Request(pool);
    // request.query("DROP TABLE users", function (err, result) {
    //     if (err) {
    //         // throw err;
    //         console.log(err);
    //     }
    //     //console.log(result, "Table deleted");
    //     // process.exit();
    //     var table = new sql.Table('users');
    //     table.create = true;
    //     // table.columns.add('id', sql.Int, {nullable: false, primary: true}); // how to auto increment?
    //     table.columns.add('username', sql.VarChar(50), {nullable: false, primary: false});
    //     table.columns.add('password', sql.VarChar(50), {nullable: false, primary: false});
    //     //console.log(table);
    //     table.rows.add("testname", "testpassword");
    //     const request2 = new sql.Request(pool);
    //     request2.bulk(table, (err, result) => {
    //         // ... error checks
    //         //console.log(err);
    //         console.log(result);
    //         // pool.request().query('select * from users where username = "testname"', (err, result) => {
    //         //     console.log(err, result);
    //         //     process.exit();
    //         // });
    //         let ps = new sql.PreparedStatement(pool);
    //         ps.input('username', sql.Int);
    //         ps.prepare('select * from users where username = @username', 
    //             function(err){
    //                 ps.execute({username: 'testname'}, (err, result) => {
    //                     // if (result.recordset.length === 0) {
    //                     //     res.status(404).send('Not Found');
    //                     // } else {
    //                     //     req.book = result.recordset[0];
    //                     //     next();
    //                     // }
    //                     console.log(err, result);
    //                     process.exit();
    //                 });
    //             }
    //         );  
            
    //     });
    // });

    // let ps = new sql.PreparedStatement(pool);
    // ps.input('username', sql.VarChar(50));
    // ps.prepare('select * from users where username = @username', 
    //     function(err){
    //         ps.execute({username: 'test2name'}, (err, result) => {
    //             // if (result.recordset.length === 0) {
    //             //     res.status(404).send('Not Found');
    //             // } else {
    //             //     req.book = result.recordset[0];
    //             //     next();
    //             // }
    //             console.log(err, result);
    //             process.exit();
    //         });
    //     }
    // );
    // const request = new sql.Request(pool);
    // request.query("SELECT * FROM users WHERE username = 'badname'", (err, result) => {
    //     console.log('query result', err, result);
    // });
    const request = new sql.Request(pool);
    request.query("SELECT * FROM users", (err, result) => {
        console.log('query result', err, result);
    });
});
