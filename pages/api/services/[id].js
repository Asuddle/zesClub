import formidable, { IncomingForm } from 'formidable';

import executeQuery from '../../../util/mongodb';

export default async function handler(req, res) {
	const { method } = req;

	switch (method) {
		case 'GET':
			try {
				let sql = `SELECT * FROM services where id=${req.query.id};`;
				// await db.query(sql, (err, result) => {
				// 	if (err) {
				// 		res.send(err);
				// 	}
				// 	res.status(200).send({ data: result });
				// });
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
			res.status(400).json({ success: false });
			break;
	}
}
