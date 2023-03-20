import executeQuery from '../../../util/mongodb';
import formidable from 'formidable';
import fs from 'fs';
import { saveFile } from '../auth';
import { verifyJwt } from '../../../util/jwtVerify';

export const config = {
	api: {
		bodyParser: false,
	},
};
export default async function handler(req, res) {
	const { method } = req;
	switch (method) {
		case 'GET':
			try {
				let qr = req.query.sort || '';
				let sql = `SELECT * FROM events where (date >= DATE(CURRENT_TIMESTAMP))  ORDER BY createdDate ${qr};`;
				console.log(sql);
				try {
					let result = await executeQuery({ query: sql });
					res.status(200).send({
						success: true,
						data: result,
					});
				} catch (error) {
					res.status(400).json({ success: false, error: error });
				}
			} catch (error) {
				res.status(400).json({ success: false, error: error });
			}
			break;

		default:
			// res.status(400).json({ success: false });
			break;
	}
}
