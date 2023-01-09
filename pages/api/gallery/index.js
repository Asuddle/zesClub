import db from '../../../util/mongodb';
import formidable from 'formidable';
import { saveFile } from '../auth';

export const config = {
	api: {
		bodyParser: false,
	},
};
export default async function handler(req, res) {
	const { method } = req;
	switch (method) {
		case 'POST':

		case 'GET':
			try {
				let qr = req.query.q || '';
				let sql = `SELECT * FROM gallery;`;
				await db.query(sql, (err, result) => {
					if (err) {
						res.send(err);
					}
					res.status(200).send({ data: result, totalCount: result.length });
				});
			} catch (error) {
				res.status(400).json({ success: false, error: error });
			}
			break;
		case 'DELETE':
			try {
				let sql = `DELETE FROM events WHERE id=${req.query.id};`;
				await db.query(sql, (err, result) => {
					if (err) {
						res.send(err);
					}
					res.status(200).send({ message: 'Event Deleted Successfully' });
				});
			} catch (error) {
				res.status(400).json({ success: false, error: error });
			}
			break;

		default:
			// res.status(400).json({ success: false });
			break;
	}
}
