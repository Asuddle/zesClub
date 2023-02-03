import bcrypt from 'bcryptjs';
import executeQuery from '../../../util/mongodb';

export default async function handler(req, res) {
	const { method } = req;

	switch (method) {
		case 'PUT':
			try {
				let sql = `UPDATE user SET isVerified = 1 WHERE id = ${req.query.userId}`;
				try {
					let result = await executeQuery({ query: sql });
					console.log(result);
					res.status(201).send({ message: 'User Verified Successfully' });
				} catch (error) {
					console.log(error);
					res.status(400).json({ success: false, error: error });
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
