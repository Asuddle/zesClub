import mysql from 'mysql';
const db = mysql.createConnection({
	host: 'az1-ts106.a2hosting.com',
	port: 3306,
	database: 'zesclubc_res',
	user: 'zesclubc_ahmad',
	password: 'Pakistan@00',
});

db.connect(function (err) {
	if (err) throw err;
	console.log('Connected!');
});

export default db;
