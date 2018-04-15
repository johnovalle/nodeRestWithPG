const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const sql = require('mssql');

const config = {
    user: 'testnode1',
    password: 'Bt1f-Fth?zV7',
    server: 'den1.mssql5.gear.host',
    database: 'testnode1'
};

const pool = new sql.ConnectionPool(config);

module.exports = () => {
    passport.use(new localStrategy({
        usernameField: 'userName',
        passwordField: 'password'
    }, 
    (username, password, done) => {
        //sometimes the pool is already connected...
        pool.connect((err) => {
            if (err) {
                console.log(err);
            }
            let ps = new sql.PreparedStatement(pool);
            ps.input('username', sql.VarChar(50));
            ps.prepare('select * from users where username = @username', 
                function(err){
                    ps.execute({username: username}, (err, result) => {
                        if(err){
                            console.log(err);
                        } else {
                            if (result.recordset.length === 0) {
                                //res.status(404).send('Not Found');
                                done(null, false, {message: 'user not found'});
                                pool.close();
                            } else {
                                let user = result.recordset[0];
                                if(user.password === password) {
                                    done(null, user);
                                    pool.close();
                                } else {
                                    done(null, false, {message: 'bad password'});
                                    pool.close();
                                }
                                
                            }
                        }
                        
                    });
                }
            );
        });
        
        // let user = {
        //     username,
        //     password
        // };
        
    }));
};

