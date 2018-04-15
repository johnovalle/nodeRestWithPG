const express = require('express');
const router = express.Router();
const sql = require('mssql');
const passport = require('passport');


function Router(pool) {
    router.route('/signUp')
        .post((req, res) => {
            let request = new sql.Request(pool);
            var table = new sql.Table('users');
            table.create = true;
            table.columns.add('username', sql.VarChar(50), {nullable: false, primary: false});
            table.columns.add('password', sql.VarChar(50), {nullable: false, primary: false});
            table.rows.add(req.body.userName, req.body.password);
            console.log(table);
            request.bulk(table, (err, result) => {
                if (err) {
                    console.log(err);
                }
                let ps = new sql.PreparedStatement(pool);
                ps.input('username', sql.VarChar(50));
                ps.prepare('select * from users where username = @username', 
                    function(err){
                        ps.execute({username: req.body.userName}, (err, result) => {
                            if (result.recordset.length === 0) {
                                res.status(404).send('Not Found');
                            } else {
                                req.login(result.recordset[0], () => {
                                    res.redirect('/auth/profile');
                                })
                            }
                        });
                    }
                );
            })  
        });
    router.route('/signIn')
        .post(passport.authenticate('local', {
            failureRedirect: '/'
        }), (req, res) => {
            res.redirect('/auth/profile');
        });
    router.route('/profile')
        .all((req, res, next) => {
            if(!req.user) {
                res.redirect('/');
            }
            next();
        })
        .get((req, res) => {
            res.json(req.user);
        });
    return router;
}



module.exports = Router;