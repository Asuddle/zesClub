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
					const { name, designation, description } = fields;
					let isFiles = Object.keys(files).length > 0;
					let sql = '';
					if (isFiles) {
						let imgFile = await saveFile(
							files,
							'image',
							`testimonial-${fields.name}`,
						);
						sql = `INSERT INTO testimonials(name,image, designation,description) VALUES('${name}','${imgFile}','${
							designation || ''
						}','${description}')`;
					} else {
						sql = `INSERT INTO testimonials(name, designation,description) VALUES('${name}','${
							designation || ''
						}','${description}')`;
					}
					try {
						let result = await executeQuery({ query: sql });
						res.status(201).send({
							success: true,
							message: 'Testimonial added successfully',
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
				let sql = `SELECT * FROM testimonials where name like '%${qr}%' or description like  '%${qr}%' or designation like  '%${qr}%' ;`;
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

				let sql = `DELETE FROM testimonials WHERE id=${req.query.id};`;
				try {
					let result = await executeQuery({ query: sql });
					res.status(200).send({
						success: true,
						message: 'Events deleted successfully',
					});
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
					const { description, name, designation } = fields;
					let isFiles = Object.keys(files).length > 0;
					let sql = '';
					if (isFiles) {
						let imageFiles = await saveFile(
							files,
							'image',
							`testimonial-${fields.name}`,
						);
						sql = `UPDATE testimonials SET name = '${name}', description = '${description}', designation = '${designation}',image='${imageFiles}' WHERE id =${req.query.id}`;
					} else {
						sql = `UPDATE testimonials SET name = '${name}', description = '${description}', designation = '${designation}' WHERE id =${req.query.id}`;
					}

					try {
						let result = await executeQuery({ query: sql });
						res.status(200).send({
							success: true,
							message: 'Testimonial updated successfully',
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
