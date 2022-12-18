import bcrypt from 'bcryptjs';
import db from '../../../util/mongodb';

export default async function handler(req, res) {
	const { method } = req;

	switch (method) {
		case 'PUT':
			try {
				let mysql = `UPDATE user SET isVerified = 1 WHERE id = ${req.query.userId}`;
				await db.query(mysql, (err, result) => {
					if (err) {
						res.send({ err });
					}
					res.status(201).send({ message: 'User Verified Successfully' });
				});
			} catch (error) {
				res.status(400).json({ success: false, error: error });
			}
			break;
		default:
			res.status(400).json({ success: false });
			break;
	}
}
