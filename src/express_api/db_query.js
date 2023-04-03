const Pool = require('pg').Pool
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'postgres',
    password: 'postgres',
    port: 5432,
})

//  .\pg_dump.exe -U postgres -W -F t postgres > C:\Users\mahle\Desktop\bkup.zip

const validateUserByUsername = (request, response) => {
  const req_body = request.body;
    // console.log(`query req body:`, req_body);
  let tokenkey = "-1";
  pool.query('SELECT * FROM sms.users WHERE username = $1', [req_body.username], (error, results) => {
    if (error) {
    // console.log(`query results error: `, error )
    }
    
    else {
      if ( results.rows.length > 0 ) {
        // console.log(`query results rows: `, results.rows)
        if (results.rows[0].username == req_body.username && results.rows[0].password == req_body.password){
            tokenkey = Math.random().toString(36).substring(2) + Math.random().toString(36).substring(2);
        }
      }
  }
    response.send(JSON.stringify({ "code": 200, "token": `${tokenkey}`, "username" : `${results.rows[0].username}` }));
  })
}

const createUser = (request, response) => {
    const req_body = request.body;
    // console.log(`query req body:`, req_body);
    
    pool.query(`INSERT INTO sms.users(id, username, password, type, email) VALUES ($1, $2, $3, $4, $5)`,[req_body.id, req_body.username, req_body.password, req_body.type, req_body.email] ,(error, results) => {
        if (error) {
        // console.log(`query results error: `, error )
        }
    response.send(JSON.stringify({ "code": 200, "message": `user added` }));
    })
}

const createPatient = (request, response) => {
  const req_body = request.body;
  console.log(`query req body:`, req_body);
  pool.query(`INSERT INTO sms.patients(id, firstname, lastname, dob, email, phone, knownissues, mrn) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`,[req_body.id, req_body.firstname, req_body.lastname, req_body.dob, req_body.email, req_body.phone, req_body.knownissues, req_body.mrn] ,(error, results) => {
      if (error) {
      // console.log(`query results error: `, error )
      }
  response.send(JSON.stringify({ "code": 200, "message": `patient added` }));
  })
}

const getUser = (request, response) => {
  const req_body = request.body;
  // console.log(`query req body getUser:`, req_body);
  var searchValue;
  var searchColumn;

  if (req_body.username) {
    searchValue = req_body.username;
    searchColumn = 'username';
  }

  else if(req_body.id) {
    searchValue = req_body.id;
    searchColumn = 'id';
  }

  else if(req_body.email) {
    searchValue = req_body.email;
    searchColumn = 'email';
  }

  // SELECT * FROM sms.users WHERE $1 in (id,username,email)
  pool.query(`SELECT * FROM sms.users WHERE ${searchColumn}=$1`, [searchValue], (error, results) => {
    if (error) {
      // console.log(`query results error: `, error )
    }
    if ( results ) {
    // // console.log(`query results rows: `, results )
    response.status(200).json(results.rows)
    }
  })
}

const getPatient = (request, response) => {
  const req_body = request.body;
  // console.log(`query req body getUser:`, req_body);
  var searchValue;
  var searchColumn;

  if (req_body.mrn) {
    searchValue = req_body.mrn;
    searchColumn = 'mrn';
  }

  else if(req_body.id) {
    searchValue = req_body.id;
    searchColumn = 'id';
  }

  else if(req_body.email) {
    searchValue = req_body.email;
    searchColumn = 'email';
  }

  else if(req_body.phone) {
    searchValue = req_body.phone;
    searchColumn = 'phone';
  }

  // SELECT * FROM sms.users WHERE $1 in (id,username,email)
  pool.query(`SELECT * FROM sms.patients WHERE ${searchColumn}=$1`, [searchValue], (error, results) => {
    if (error) {
      // console.log(`query results error: `, error )
    }
    if ( results ) {
    console.log(`query results rows: `, results )
    response.status(200).json(results.rows)
    }
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

const getPatients = (request, response) => {
  pool.query('SELECT * FROM sms.patients ORDER BY mrn ASC', (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const updateUser = (request, response) => {
  // const id = parseInt(request.params.id)
  // const { name, email } = request.body
  const req_body = request.body;
  // console.log(`query req body updateUser:`, req_body);
  pool.query(`UPDATE sms.users SET username = $1, password = $2, email = $3 WHERE username = $1`,[req_body.username, req_body.password, req_body.email] ,(error, results) => {
    if (error) {
    // console.log(`query results error: `, error )
    }
    response.send(JSON.stringify({ "code": 200, "message": `user updated` }));
})
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

const createAppt = (request, response) => {
  const req_body = request.body;
  console.log(`query req body:`, req_body);
  pool.query(`INSERT INTO sms.appointments(id, mrn, datetime, doctor) VALUES ($1, $2, $3, $4)`,[req_body.id, req_body.mrn, req_body.date, req_body.doctor], (error, results) => {
    if (error) {
      // console.log(`query results error: `, error )
    }
    if ( results ) {
    // console.log(`query results rows: `, results )
    response.status(200).json(results.rows)
    }
  })
}

const updateAppt = (request, response) => {
  const req_body = request.body;
  console.log(`query req body:`, req_body);
  pool.query(`UPDATE sms.appointments SET datetime = $2, doctor = $3 WHERE id = $1`,[req_body.id, req_body.date, req_body.doctor], (error, results) => {
    if (error) {
      // console.log(`query results error: `, error )
    }
    if ( results ) {
    // console.log(`query results rows: `, results )
    response.status(200).json(results.rows)
    }
  })
}

const getTodaysAppts = (request, response) => {
  const req_body = request.body;
  // console.log(`query req body:`, req_body);
  pool.query(`SELECT * FROM sms.appointments WHERE datetime::date = now()::date`, (error, results) => {
    if (error) {
      // console.log(`query results error: `, error )
    }
    if ( results ) {
    // console.log(`query results rows: `, results )
    response.status(200).json(results.rows)
    }
  })
}

const getAllAppts = (request, response) => {
  const req_body = request.body;
  // console.log(`query req body:`, req_body);
  pool.query(`SELECT * FROM sms.appointments`, (error, results) => {
    if (error) {
      // console.log(`query results error: `, error )
    }
    if ( results ) {
    // console.log(`query results rows: `, results )
    response.status(200).json(results.rows)
    }
  })
}

module.exports = {
  getUsers,
  getPatients,
  getUser,
  getPatient,
  validateUserByUsername,
  createUser,
  createPatient,
  updateUser,
  deleteUser,
  createAppt,
  updateAppt,
  getTodaysAppts,
  getAllAppts
}