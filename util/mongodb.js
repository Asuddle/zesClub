import mysql from 'mysql';
const db = mysql.createConnection({
	host: '127.0.0.1',
	port: 3306,
	database: 'res',
	user: 'root',
	password: 'password',
	// host: 'az1-ts106.a2hosting.com',
	// port: 3306,
	// database: 'zesclubc_res',
	// user: 'zesclubc_ahmad',
	// password: 'password',
});

// host: 'az1-ts106.a2hosting.com',
// port: 3306,
// database: 'zesclubc_res',
// user: 'zesclubc_ahmad',
// password: 'password',

db.connect(function (err) {
	if (err) throw err;
	console.log('Connected!');
});

export default db;
