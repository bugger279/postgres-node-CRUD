
const Pool = require('pg').Pool;
const pool = new Pool({
    user: 'me',
    host: 'localhost',
    database: 'api',
    password: 'password',
    port: 5432,
});

const getUsers = (req, res) => {
    pool.query(`SELECT * FROM users ORDER BY id ASC`, (error, results) => {
        if (error) {
            throw error;
        }
        if (results.rowCount > 0) {
            res.status(200).json({data: results.rows})
        } else {
            res.status(404).json({data: 'No user found'})
        }
    })
}

const getUsersById = (req, res) => {
    const id = parseInt(req.params.id);
    pool.query(`SELECT * FROM users WHERE id = ${id}`, (error, results) => {
        if (error) {
            throw error;
        }
        if (results.rowCount > 0) {
            res.status(200).json({data: results.rows})
        } else {
            res.status(404).json({data: 'No user found'})
        }
    })
}

const createUser = (req, res) => {
    const {name, email} = req.body;
    pool.query(`INSERT INTO users (name, email) VALUES ($1, $2)`, [name, email], (error, results) => {
        if (error) {
            throw error;
        } else {
            res.status(201).json({message: `User created successfully with UID: ${results.insertId}`})
        }
    })
}

const updateUser = (req, res) => {
    const id = parseInt(req.params.id);
    const { name, email } = req.body;

    pool.query('UPDATE users SET name = $1, email = $2 WHERE id = $3', [name, email, id], (error, results) => {
        if (error) {
            throw error;
        } if (results.rowCount <= 0) {
            res.status(404).json({message: `User doesn't exist`});
        } 
        res.status(201).json({message: `User modified with ID: ${id}`});
    })
}


const deleteUser = (req, res) => {
    const id = parseInt(req.params.id);
    pool.query(`DELETE FROM users WHERE id=${id}`, (error, results) => {
        if (error) {
            throw error;
        } if (results.rowCount <= 0) {
            res.status(404).json({message: `User doesn't exist`});
        } else {
            res.status(201).json({message: `User deleted with ID: ${id}`});
        }
    });
}

module.exports = {
    getUsers,
    getUsersById,
    createUser,
    updateUser,
    deleteUser
}