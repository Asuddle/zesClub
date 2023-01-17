import db from '../../../util/mongodb';
import formidable from 'formidable';
import fs from 'fs';
import { saveFile } from '../auth';

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
				let qr = req.query.q || '';
				let sql = `SELECT * FROM pages where id=1;`;
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
		case 'PUT':
			try {
				const form = new formidable.IncomingForm();
				form.parse(req, async function (err, fields, files) {
					if (err) {
						res.send({ err });
					}
					let str = '';
					for (const key in fields) {
						str = str + `${key} = "${fields[key]}", `;
					}
					str = str.replace(/,\s*$/, '');

					let sql = `UPDATE pages SET ${str} WHERE id = 1`;

					await db.query(sql, async (err, result) => {
						if (err) {
							res.send({ err });
						}
						res
							.status(200)
							.json({ success: true, message: 'Page Updated Successfully' });
					});
				});
			} catch (error) {
				console.log(error);
				res.status(400).json({ success: false, error });
			}
		default:
			// res.status(400).json({ success: false });
			break;
	}
}
