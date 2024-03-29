import executeQuery from '../../../util/mongodb';
import { verifyJwt } from '../../../util/jwtVerify';

export default async function handler(req, res) {
	const { method } = req;

	switch (method) {
		case 'PUT':
			try {
				let authheader = req.headers.authorization;
				await verifyJwt(authheader, res);

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
