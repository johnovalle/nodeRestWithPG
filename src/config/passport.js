const passport = require('passport');

module.exports = (app) => {
    app.use(passport.initialize());
    app.use(passport.session());

    passport.serializeUser((user, done) => {
        done(null, user); //just user.id if user obj is big
    });

    passport.deserializeUser((user, done) => {
        done(null, user);  //this would take a userId and return the user from the DB if user obj is big
    });
    
    require('./strategies/local.strategy')();
};

