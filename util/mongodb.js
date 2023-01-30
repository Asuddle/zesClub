// import mysql from 'mysql';
import mysql from 'serverless-mysql';

const db = mysql({
	config: {
		host: '127.0.0.1',
		port: 3306,
		database: 'res',
		user: 'root',
		password: 'password',
		connectionLimit: 100,
	},
	// host: 'az1-ts106.a2hosting.com',
	// port: 3306,
	// database: 'zesclubc_res',
	// user: 'zesclubc_ahmad',
	// password: 'password',
	// connectionLimit: 100,
});

// async function db({ query, values }) {
// 	try {
// 		const results = await pool.query(query, values);
// 		await db.end();
// 		return results;
// 	} catch (error) {
// 		return { error };
// 	}
// }

// var db = (function () {
// 	function _query(query, params, callback) {
// 		pool.getConnection(function (err, connection) {
// 			connection.query(queryString, function (err, rows, fields) {
// 				if (err) {
// 					res.send('FAILURE');
// 				}
// 				if (rows.length <= 0) {
// 					res.send(" [ { Result: 'Failure' } ]");
// 					return;
// 				} else {
// 					res.send(rows);
// 					return;
// 				}
// 				connection.release();
// 			});
// 		});
// 	}

// 	return {
// 		query: _query,
// 	};
// })();

//     });

export default async function executeQuery({ query, values }) {
	try {
		const results = await db.query(query, values);
		await db.end();
		return results;
	} catch (error) {
		return { error };
	}
}

// export default db;

// pool.getConnection(function (err, connection) {
// 	if (err) {
// 		connection.release();
// 		callback(null, err);
// 		throw err;
// 	} else {
// 		connection.query(query, params, function (err, rows) {
// 			connection.release();
// 			if (!err) {
// 				callback(rows);
// 			} else {
// 				callback(null, err);
// 			}
// 		});
// 		connection.on('error', function (err) {
// 			connection.release();
// 			console.log(err);
// 			callback(null, err);
// 			throw err;
// 		});
// 	}
// });
