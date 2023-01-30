import executeQuery from '../../../util/mongodb';
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
					const { title, description, image } = fields;
					let fileName = await saveFile(
						files,
						'image',
						`service-${fields.title}`,
					);
					let sql = `INSERT INTO services(title, image,description) VALUES('${title}','${fileName}','${description}')`;
					try {
						let result = await executeQuery({ query: sql });
						res.status(201).send({
							success: true,
							message: 'Service added successfully',
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
				let sql = `SELECT * FROM services where title like '%${qr}%' or description like  '%${qr}%' ;`;
				try {
					let result = await executeQuery({ query: sql });
					res.status(201).send({
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
				let sql = `DELETE FROM services WHERE id=${req.query.id};`;
				try {
					let result = await executeQuery({ query: sql });
					res.status(200).send({
						success: true,
						message: 'Service deleted successfully',
					});
				} catch (error) {
					res.status(400).json({ success: false, error: error });
				}
				// await db.query(sql, (err, result) => {
				// 	if (err) {
				// 		res.send(err);
				// 	}
				// 	res.status(200).send({ message: 'Service Deleted Successfully' });
				// });
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
					const { description, title } = fields;
					//
					let isFiles = Object.keys(files).length > 0;
					if (isFiles) {
						await saveFile(files, 'image');
					}
					let sql = `UPDATE services SET title = '${title}', description = '${description}' WHERE id =${req.query.id}`;

					if (isFiles) {
						sql = `UPDATE services SET title = '${title}', description = '${description}',image='${files.image.originalFilename}' WHERE id =${req.query.id}`;
					}
					try {
						let result = await executeQuery({ query: sql });
						res.status(200).send({
							success: true,
							message: 'Service updated successfully',
						});
					} catch (error) {
						res.status(400).json({ success: false, error: error });
					}
					// await db.query(sql, async (err, result) => {
					// 	if (err) {
					// 		res.send({ err });
					// 	}
					// 	res
					// 		.status(200)
					// 		.json({ success: true, message: 'Service Updated Successfully' });
					// });
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
