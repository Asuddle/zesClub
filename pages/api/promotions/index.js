import executeQuery from '../../../util/mongodb';
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
			try {
				const form = new formidable.IncomingForm();

				form.parse(req, async function (err, fields, files) {
					if (err) {
						res.send({ err });
					}
					const { name, image } = fields;
					let fileName = await saveFile(files, 'image', fields.name);

					let sql = `INSERT INTO categories(name,image) VALUES('${name}','${fileName}')`;
					try {
						let result = await executeQuery({ query: sql });
						console.log(result);
						res.status(201).send({
							success: true,
							message: 'Category Created Succcessfully',
						});
					} catch (error) {
						res.status(400).json({ success: false, error: error });
					}
					// await db.query(sql, async (err, result) => {
					// 	if (err) {
					// 		res.send({ err });
					// 	}
					// 	res.status(201).json({
					// 		success: true,
					// 		message: 'Category Created Successfully',
					// 	});
					// });
				});
			} catch (error) {
				console.log(error);
				res.status(400).json({ success: false, error: error });
			}
			break;
		case 'GET':
			try {
				let qr = req.query.q || '';
				let sql = `SELECT * FROM categories where name like '%${qr}%';`;
				try {
					let result = await executeQuery({ query: sql });
					console.log(result);
					res.status(200).send({ data: result, totalCount: result.length });
				} catch (error) {
					res.status(400).json({ success: false, error: error });
				}
			} catch (error) {
				res.status(400).json({ success: false, error: error });
			}
			break;
		case 'DELETE':
			try {
				let sql = `DELETE FROM categories WHERE id=${req.query.id};`;
				try {
					let result = await executeQuery({ query: sql });
					console.log(result);
					res
						.status(200)
						.send({ success: true, message: 'Category Deleted Successfully' });
				} catch (error) {
					res.status(400).json({ success: false, error: error });
				}
				// await db.query(sql, (err, result) => {
				// 	if (err) {
				// 		res.send(err);
				// 	}
				// 	res.status(200).send({ message: 'Categories Deleted Successfully' });
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
					const { name } = fields;

					let imageFile = '';
					let isFiles = Object.keys(files).length > 0;
					if (isFiles) {
						imageFile = await saveFile(files, 'image', fields.name);
					}
					let sql = `UPDATE categories SET name = '${name}' WHERE id =${req.query.id}`;

					if (isFiles) {
						sql = `UPDATE categories SET name = '${name}',image='${imageFile}' WHERE id =${req.query.id}`;
					}
					// console.log('sqlll', sql);
					try {
						let result = await executeQuery({ query: sql });
						console.log(result);
						res.status(200).send({
							success: true,
							message: 'Promotion Updated Successfully',
						});
					} catch (error) {
						res.status(400).json({ success: false, error: error });
					}
					// await db.query(sql, async (err, result) => {
					// 	if (err) {
					// 		res.send({ err });
					// 	}
					// 	res.status(200).json({
					// 		success: true,
					// 		message: 'Promotion Updated Successfully',
					// 	});
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
