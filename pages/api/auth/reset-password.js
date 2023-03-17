import bcrypt from 'bcryptjs';
import executeQuery from '../../../util/mongodb';
import jwt from 'jsonwebtoken';
import nodemailer from 'nodemailer';

export default async function handler(req, res) {
	const { method } = req;

	switch (method) {
		case 'POST':
			try {
				const { email, token, password } = req.body;
				let getSql = `SELECT * FROM user where token=${token}`;
				try {
					let get = await executeQuery({ query: getSql });
					if (get.length > 0) {
						try {
							const hash = await bcrypt.hash(password, 10);
							let sql = `UPDATE user SET password='${hash}',token='' where email ='${email}'`;
							let result = await executeQuery({ query: sql });
							console.log(result);
							res
								.status(200)
								.json({ success: true, data: 'Password Updated Success' });
						} catch (error) {
							console.log(error);
							res.status(400).json({ success: false, error: error });
						}
					}
				} catch (error) {
					console.log(error);
					res.status(400).json({ success: false, error: error });
				}
			} catch (error) {
				console.log(error);
				res.status(400).json({ success: false, error: error });
			}
			break;
		case 'GET':
			break;
		case 'DELETE':
			break;
		default:
			res.status(400).json({ success: false });
			break;
	}
}
