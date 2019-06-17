const express = require('express');
const server = express();

const db = require('./data/db');

server.use(express.json());


//========== GET ================

server.get('/', (req, res) => {
    res.send('<h1>Hello Pale Blue Dot</h1>');
});

server.get('/users', (req, res) => {
    db.find()
    .then(users => {
        res.status(200).json(users);
    })
    .catch(err => {
        res.status(500).json({
            success: false,
            message: 'The users information could not be retrieved'
        });
    });
})

 server.get('/users/:id', (req, res) => {
     const { id } = req.params;

     db.findById(req.params.id)
     .then(user => {
         if(user) {
             res.status(200).json({
                 success: true,
                 user
             })
         } else {
             res.status(404).json({
                 success: false,
                 message: 'The user with the specified ID does not exist.'
             })
         }
     })
 })

//========== POST =================

server.post('/users', (req,res) => {
    const userInfo = req.body;

    db.add(userInfo)
    .then(users => {
        res.status(201).json({
            success: true,
            users
        })
        .catch(err => {
            res.status(500).json({
                success: false,
                err
            });
        });
    })
})

//========= DELETE =================

server.delete('/users/:id', (req, res) => {
    const { id } = req.params;

    db.remove(id)
    .then(deleted => {
        if(deleted) {
            res.status(204).end();
        } else {
            res.status(404).json({
                success: false,
                message: 'The user with the specified ID does not exist.'
            });
        }
    })
    .catch(err => {
        res.status(500).json({
            success: false,
            err
        })
    })
})

server.listen(4000, () => {
    console.log('\n*** Server is running on port 4000 ***\n');
});