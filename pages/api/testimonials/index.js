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
					const { name, designation, description } = fields;
					let sql = `INSERT INTO testimonials(name, designation,description) VALUES('${name}','${designation}','${description}')`;
					await db.query(sql, async (err, result) => {
						if (err) {
							res.send({ err });
						}
						res.status(201).json({
							success: true,
							message: 'Testimonial Created Successfully',
						});
					});
				});
			} catch (error) {
				console.log(error);
				res.status(400).json({ success: false, error: error });
			}
			break;
		case 'GET':
			try {
				let qr = req.query.q || '';
				let sql = `SELECT * FROM testimonials where name like '%${qr}%' or description like  '%${qr}%' or designation like  '%${qr}%' ;`;
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
				let sql = `DELETE FROM testimonials WHERE id=${req.query.id};`;
				await db.query(sql, (err, result) => {
					if (err) {
						res.send(err);
					}
					res.status(200).send({ message: 'Service Deleted Successfully' });
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
					const { description, name, designation } = fields;

					let sql = `UPDATE testimonials SET name = '${name}', description = '${description}', designation = '${designation}' WHERE id =${req.query.id}`;

					await db.query(sql, async (err, result) => {
						if (err) {
							res.send({ err });
						}
						res.status(200).json({
							success: true,
							message: 'Testimonial Updated Successfully',
						});
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