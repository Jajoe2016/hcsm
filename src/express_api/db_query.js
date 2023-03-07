const Pool = require('pg').Pool
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'postgres',
    password: 'postgres',
    port: 5432,
})

const validateUserByUsername = (request, response) => {
  const req_body = request.body;
    console.log(`query req body:`, req_body);
  let tokenkey = "-1";
  pool.query('SELECT * FROM sms.users WHERE username = $1', [req_body.username], (error, results) => {
    if (error) {
    console.log(`query results error: `, error )
    }
    // console.log(`query results rows: `, results.rows)
    else {
    if ( results.rows.length > 0 ) {
        if (results.rows[0].username == req_body.username && results.rows[0].password == req_body.password){
            tokenkey = Math.random().toString(36).substring(2) + Math.random().toString(36).substring(2);
        }
    }
  }
    response.send(JSON.stringify({ "code": 200, "token": `${tokenkey}` }));
  })
}

const createUser = (request, response) => {
    const req_body = request.body;
    console.log(`query req body:`, req_body);
    
    pool.query(`INSERT INTO sms.users(id, username, password, type, email) VALUES ($1, $2, $3, $4, $5)`,[req_body.id, req_body.username, req_body.password, req_body.type, req_body.email] ,(error, results) => {
        if (error) {
        console.log(`query results error: `, error )
        }
    response.send(JSON.stringify({ "code": 200, "message": `user added` }));
    })
  }

const getUser = (request, response) => {
  const req_body = request.body;
  console.log(`query req body:`, req_body);
  pool.query('SELECT * FROM sms.users WHERE username = $1', [req_body.username], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const getUsers = (request, response) => {
    pool.query('SELECT * FROM sms.users ORDER BY id ASC', (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
    })
  }

const updateUser = (request, response) => {
  const id = parseInt(request.params.id)
  const { name, email } = request.body

  pool.query(
    'UPDATE users SET name = $1, email = $2 WHERE id = $3',
    [name, email, id],
    (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).send(`User modified with ID: ${id}`)
    }
  )
}

const deleteUser = (request, response) => {
  const id = parseInt(request.params.id)

  pool.query('DELETE FROM users WHERE id = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).send(`User deleted with ID: ${id}`)
  })
}

module.exports = {
  getUsers,
  validateUserByUsername,
  createUser,
  updateUser,
  deleteUser,
}