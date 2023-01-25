import mysql from 'mysql';
const pool = mysql.createPool({
	host: '127.0.0.1',
	port: 3306,
	database: 'res',
	user: 'root',
	password: 'password',
	connectionLimit: 100,

	// host: 'az1-ts106.a2hosting.com',
	// port: 3306,
	// database: 'zesclubc_res',
	// user: 'zesclubc_ahmad',
	// password: 'password',
	// connectionLimit: 100,
});

// host: 'az1-ts106.a2hosting.com',
// port: 3306,
// database: 'zesclubc_res',
// user: 'zesclubc_ahmad',
// password: 'password',

// db.connect(function (err) {
// 	if (err) throw err;
// 	console.log('Connected!');
// });

var db = (function () {
	function _query(query, params, callback) {
		pool.getConnection(function (err, connection) {
			if (err) {
				connection.release();
				callback(null, err);
				throw err;
			} else {
				connection.query(query, params, function (err, rows) {
					connection.release();
					if (!err) {
						callback(rows);
					} else {
						callback(null, err);
					}
				});

				connection.on('error', function (err) {
					connection.release();
					callback(null, err);
					throw err;
				});
			}
		});
	}

	return {
		query: _query,
	};
})();

//     });

export default db;
