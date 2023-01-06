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
		case 'POST':
			try {
				const form = new formidable.IncomingForm();

				form.parse(req, async function (err, fields, files) {
					if (err) {
						res.send({ err });
					}
					const { name, description, price, audience, date, venue } = fields;
					await saveFile(files, 'image');
					let sql = `INSERT INTO events(name, description, price, audience, date, venue, image) VALUES('${name}','${description}','${price}','${audience}','${date}','${venue}','${files.image.originalFilename}')`;
					await db.query(sql, async (err, result) => {
						if (err) {
							res.send({ err });
						}
						res
							.status(201)
							.json({ success: true, message: 'Event Created Successfully' });
					});
				});
			} catch (error) {
				console.log(error);
				res.status(400).json({ success: false, error: error });
			}
			break;
		case 'GET':
			try {
				let sql = `SELECT bookings.user_id,bookings.event_id,events.name as event_name ,events.price,events.image,customers.firstName,user.email,customers.lastName ,bookings.is_paid  
				FROM bookings 
				INNER JOIN events ON bookings.event_id=events.id
				INNER JOIN user ON bookings.user_id=user.id
				INNER JOIN customers ON bookings.user_id=customers.user_id;`;

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
		case 'PUT':
			try {
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
					await db.query(sql, async (err, result) => {
						if (err) {
							res.send({ err });
						}
						res
							.status(200)
							.json({ success: true, message: 'Event Updated Successfully' });
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
