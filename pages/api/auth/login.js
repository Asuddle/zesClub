// import User from '../../../models/User';
import bcrypt from 'bcryptjs';
import db from '../../../util/mongodb';
import jwt from 'jsonwebtoken';

export default async function handler(req, res) {
	const { method } = req;

	switch (method) {
		case 'POST':
			try {
				let { email, password } = req.body;

				var sql = `SELECT * FROM user WHERE email="${email}"`;
				try {
					db.query(sql, (err, result) => {
						if (err) {
							res.send({ err });
						}
						if (result.length === 0) {
							res.send({ err: 'No match found' });
						} else if (!result[0].isVerified && result[0].role !== 'admin') {
							res.send({ err: 'The admin will verify you shortly' });
						} else {
							let data = result[0];
							if (!bcrypt.compareSync(password, data.password)) {
								res.send({ err: 'No match found' });
							}

							const token = jwt.sign({ sub: data.id }, 'newsecret', {
								expiresIn: '7d',
							});

							return res.status(200).json({
								...data,
								...{ token },
							});
						}
					});
				} catch (error) {
					res.send({ error });
				}
			} catch (error) {
				res.status(400).json({ success: false, error: error });
			}
			break;
		default:
			res.status(400).json({ success: false });
			break;
	}
}
