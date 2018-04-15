const express = require('express');
const router = express.Router();
const sql = require('mssql');



function Router(nav, pool) {

    router.use((req, res, next) => {
        if(!req.user) {
            res.redirect('/');
        }
        next();
    });

    var books = [{
        title: "war or worlds",
        author: "wendigo"
    },
    {
        title: "hands of glass",
        author: "gorgon"
    },
    {
        title: "just save sara",
        author: "rock monster"
    },
    {
        title: "silk shards",
        author: "ice elemental"
    },
    {
        title: "guests in the kitchen",
        author: "wendigo"
    },
    ];
    router.route('/')
    .get((req, res) => {
        console.log("from books", pool);
        let request = new sql.Request(pool);
        request.query('select *  from books', (err, result) => {
           console.log('query result', result.recordset);
           res.render('books', {
                title: "hello from router BOOKS",
                books: result.recordset,
                nav
            });
        });
        
    });
    router.route('/:id')
    .all((req, res, next) => {
        let ps = new sql.PreparedStatement(pool);
        ps.input('id', sql.Int);
        ps.prepare('select * from books where id = @id', 
            function(err){
                ps.execute({id: req.params.id}, (err, result) => {
                    if (result.recordset.length === 0) {
                        res.status(404).send('Not Found');
                    } else {
                        req.book = result.recordset[0];
                        next();
                    }
                });
            }
        );  
    })
    .get((req, res) => {
        res.render('book', {
            title: "hello from router book",
            book: req.book,
            nav
        });
    });

    return router;
}



module.exports = Router;