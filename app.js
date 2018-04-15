const express = require('express');
const app = express();
const sql = require('mssql');
const bodyParser = require('body-parser');
const port = 3000;

//const cookieParser = require('cookie-parser');

const session = require('express-session');

const config = {
    user: 'testnode1',
    password: 'Bt1f-Fth?zV7',
    server: 'den1.mssql5.gear.host',
    database: 'testnode1'
};

const pool = new sql.ConnectionPool(config);

pool.connect((err) => {
   if (err) {
       console.log(err);
   }
});

var nav = [{
    link: '/books',
    text: 'books'
}, {
    link: '/authors',
    text: 'authors'
}];

const bookRouter = require('./src/routes/bookRoutes')(nav, pool);
const authRouter = require('./src/routes/authRoutes')(pool);

app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
  }));
//app.use(cookieParser());
app.use(session({secret: 'whale',
                resave: false,
                saveUninitialized: true,
                cookie: {}
            }));

require('./src/config/passport')(app);

app.set('views', './src/views');

// const handlebars = require('express-handlebars');
// app.engine('.hbs', handlebars({extname: '.hbs'}));

app.set('view engine', 'ejs');

app.use('/books', bookRouter);
app.use('/auth', authRouter);

app.get('/', (req, res) => {
    res.render('index', {
        title: "hello from render",
        nav
    });
});

app.listen(port, (err) => {
    console.log(`running on port: ${port}`);
});