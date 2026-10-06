const express = require('express');
const router = express.Router();

var db = require('../utils/database');



router.get('/:table', (req, res) => {

    var table = req.params.table;

    db.query(`SELECT * FROM ${table}`, (err, results) => 
        {
            if (err) {
                return res.status(500).json({ error: 'Database query error'+ err.message });
            }
            else {
              return  res.status(200).json(results);
            }
        });
});

// get a record by id from the table
router.get('/:table/:id', (req, res) => {

    let table = req.params.table;
    let id = req.params.id;

    db.query(`SELECT * FROM ${table} WHERE ID = ?`, [id], (err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Database query error'+ err.message });
        }
        else {
            return res.status(200).json(results);
        }
    });
});
// add new record to the table
router.post('/:table', (req, res) => {
    let table = req.params.table;
    let data = req.body;

    let fields = Object.keys(data).join(', ');
    let values = "'" + Object.values(data).join("', '") + "'";


    db.query(`INSERT INTO ${table} (${fields}) VALUES (${values})`, (err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Database query error'+ err.message });
        }
        else {
            return res.status(201).json({ message: 'Record added successfully', id: results.insertId });
        }
    });
    

    

    
});

router.patch('/:table/:id', (req, res) => {
    let table = req.params.table;
    let id = req.params.id;
    let data = req.body;
    let update = Object.entries(data).map(([key, value]) => `${key} = '${value}'`).join(', ');
    
    db.query(`UPDATE ${table} SET ${update} WHERE ID = ?`, [id], (err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Database query error'+ err.message });
        }
        else {
            return res.status(200).json({ message: 'Record updated successfully' });
        }
    });

});

router.delete('/:table/:id', (req, res) => {
     let table = req.params.table;
    let id = req.params.id;

    db.query(`DELETE FROM ${table} WHERE ID = ?`, [id], (err, _results) => {
        if (err) {
            return res.status(500).json({ error: 'Database query error'+ err.message });
        }
        else {
            return res.status(200).json({ message: 'Record deleted successfully' });
        }
    });


});

router.delete('/:table', (req, res) => {
    let table = req.params.table;

    db.query(`DELETE FROM ${table}`, (err, _results) => {
        if (err) {
            return res.status(500).json({ error: 'Database query error'+ err.message });
        }
        else {
            return res.status(200).json({ message: 'All records deleted successfully' });
        }
    });
});


// select specific columns from the table
router.get('/:table/:field/:operator/:value', (req, res) => {
    let table = req.params.table;
    let field = req.params.field;
    let operator = getOps(req.params.operator);
    let value = req.params.value;

    db.query(`SELECT * FROM ${table} WHERE ${field} ${operator} ?`, [value], (err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Database query error'+ err.message });
        }
        else {
            return res.status(200).json(results);
        }
    });
});

function getOps(op) {
    switch (op) {
        case 'eq':
            return '=';
        case 'ne':
            return '!=';
        case 'lt':
            return '<';
        case 'lte':
            return '<=';
        case 'gt':
            return '>';
        case 'gte':
            return '>=';
        default:
            
   
        throw new Error('Invalid operator'); 
    }
}

module.exports = router;
