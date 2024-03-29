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
		case 'POST':
			try {
				const form = new formidable.IncomingForm();

				form.parse(req, async function (err, fields, files) {
					if (err) {
						res.send({ err });
					}

					const { name, description, price, audience, date, venue } = fields;
					let eventPhoto = await saveFile(files, 'image', 'events');
					let sql = `INSERT INTO events(name, description, price, audience, date, venue, image) VALUES('${name}','${description}','${price}','${audience}','${date}','${venue}','${`events-${files.image.originalFilename}`}')`;
					try {
						let result = await executeQuery({ query: sql });
						res.status(201).send({
							success: true,
							message: 'Events added successfully',
						});
					} catch (error) {
						res.status(400).json({ success: false, error: error });
					}
				});
			} catch (error) {
				console.log(error);
				res.status(400).json({ success: false, error: error });
			}
			break;
		case 'GET':
			try {
				let qr = req.query.q || '';
				let sql = `SELECT * FROM events where (date >= DATE(CURRENT_TIMESTAMP)) and (name like '%${qr}%' or price like  '%${qr}%' or description like  '%${qr}%' or venue like  '%${qr}%' or audience like  '%${qr}%');`;
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
		case 'DELETE':
			try {
				let authheader = req.headers.authorization;
				await verifyJwt(authheader, res);

				let sql = `DELETE FROM events WHERE id=${req.query.id};`;
				try {
					let result = await executeQuery({ query: sql });
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
					const { name, description, price, audience, date, venue } = fields;
					//
					let isFiles = Object.keys(files).length > 0;
					if (isFiles) {
						await saveFile(files, 'image');
					}
					let sql = `UPDATE events SET name = '${name}', description = '${description}', price = '${price}',audience='${audience}',date='${date}',venue='${venue}' WHERE id =${req.query.id}`;

					if (isFiles) {
						sql = `UPDATE events SET name = '${name}', description = '${description}', price = '${price}',audience='${audience}',date='${date}',venue='${venue}',image='${files.image.originalFilename}' WHERE id =${req.query.id}`;
					}

					console.log(isFiles);
					try {
						let result = await executeQuery({ query: sql });
						res.status(200).send({
							success: true,
							message: 'Event updated successfully',
						});
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
