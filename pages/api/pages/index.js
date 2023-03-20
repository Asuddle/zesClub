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
				let qr = req.query.q || '';
				let sql = `SELECT * FROM pages where id=1;`;
				try {
					const result = await executeQuery({ query: sql });
					res.status(200).send({ data: result, totalCount: result.length });
				} catch (error) {
					res.status(400).json({ success: false, error: error });
				}
			} catch (error) {
				res.status(400).json({ success: false, error: error });
			}
			break;
		case 'PUT':
			try {
				let authheader = req.headers.authorization;
				await verifyJwt(authheader, res);

				const form = new formidable.IncomingForm();
				form.parse(req, async function (err, fields, files) {
					if (err) {
						res.send({ err });
					}
					let str = '';
					for (const key in fields) {
						let commaHandledValue = fields[key].replaceAll("'", "''");
						str = str + `${key} = '${commaHandledValue}', `;
					}
					str = str.replace(/,\s*$/, '');

					let sql = `UPDATE pages SET ${str} WHERE id = 1`;
					try {
						let result = await executeQuery({ query: sql });
						res
							.status(200)
							.send({ success: true, message: 'Pages Updated Successfully' });
					} catch (error) {
						res.status(400).json({ success: false, error: error });
					}
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
