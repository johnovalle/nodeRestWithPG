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
    // console.log("pool", pool);
    console.log(err);
    const request = new sql.Request(pool);
    request.query("DROP TABLE books", function (err, result) {
        if (err) {
            // throw err;
            console.log(err);
        }
        console.log(result, "Table deleted");
    });
    

    var table = new sql.Table('books');
    table.create = true;
    table.columns.add('id', sql.Int, {autoIncrement: true, primary: true});
    table.columns.add('title', sql.VarChar(50), {nullable: false, primary: false});
    table.columns.add('author', sql.VarChar(50), {nullable: false, primary: false});
    table.rows.add(6, "palm eater", "wendigo");
    table.rows.add(7, "before there were monsters", "gorgon");
    table.rows.add(8, "crusher and friends", "rock monster");
    console.log(table);
    const request = new sql.Request(pool);
    request.bulk(table, (err, result) => {
        // ... error checks
        console.log(err);
        console.log(result);
        process.exit();
    })
});
