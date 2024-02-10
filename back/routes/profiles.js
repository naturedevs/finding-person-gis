const Pool = require('pg').Pool
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'postgres',
    password: '123',
    port: 5432,
  });

const getProfiles = (request, response) => {
    pool.query('SELECT * FROM profiles ORDER BY uid ASC', (error, results) => {
        if (error) {
        throw error
        }
        response.status(200).json(results.rows)
    })
}

const getProfileById = (request, response) => {
    const id = request.body.id;
    console.log(id);

    pool.query('SELECT * FROM profiles WHERE user_id = $1', [id], (error, results) => {
        if (error) {
            response.status(200).json({result: false})
            throw error
        }
        response.status(200).json({result: true})
    })
}

const createProfile = (request, response) => {
    const { user_id, user_name, type, lati_tude, long_tude } = request.body

    pool.query('SELECT * FROM profiles WHERE user_id = $1', [user_id], (error, results) => {
        console.log("1", results.rows.length);
        if (results.rows.length == 0) {
            console.log("2");
            pool.query('INSERT INTO profiles (user_id, user_name, type, lati_tude, long_tude) VALUES ($1, $2, $3, $4, $5)', [user_id, user_name, type, lati_tude, long_tude], (error, results) => {
                if (error) {
                throw error
                }
                response.status(201).send({result: true})
            })
        }else {
            response.status(201).send({result: false})
        }
    })

}

const updateProfile = (request, response) => {
    const id = request.body.uid;
    const { uid, user_id, user_name, type, lati_tude, long_tude } = request.body

    pool.query(
        'UPDATE profiles SET user_id = $2, user_name = $3, type = $4, lati_tude = $5, long_tude = $6 WHERE uid = $1',
        [uid, user_id, user_name, type, lati_tude, long_tude],
        (error, results) => {
            if (error) {
                response.status(200).json({result: false})
                throw error
            }
            response.status(200).send({result: true})
        }
    )
}

const deleteProfile = (request, response) => {
    const id = request.body.user_id;

    pool.query('DELETE FROM profiles WHERE user_id = $1', [id], (error, results) => {
        if (error) {
            response.status(200).json({result: false})
            throw error
        }
        response.status(200).send({result: true})
    })
}

module.exports = {
  getProfiles,
  getProfileById,
  createProfile,
  updateProfile,
  deleteProfile,
}