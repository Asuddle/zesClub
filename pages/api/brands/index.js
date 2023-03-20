import executeQuery from '../../../util/mongodb';
// import db from '../../../util/mongodb';
import formidable from 'formidable';
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
					const { name, category_id } = fields;
					let fileName = await saveFile(
						files,
						'image',
						`brands-${fields.name}`,
					);

					let sql = `INSERT INTO brands(name,image,category_id) VALUES('${name}','${fileName}','${category_id}')`;
					try {
						let result = await executeQuery({ query: sql });
						console.log(result);
						res
							.status(201)
							.send({ success: true, message: 'Brands Created Successfully' });
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
				let sql = `SELECT categories.name as  categoryName ,brands.name,brands.image,brands.id,brands.createdDate FROM brands  INNER JOIN categories ON categories.id=brands.category_id where brands.name like '%${qr}%';`;
				try {
					const result = await executeQuery({ query: sql });
					res.status(200).send({ data: result, totalCount: result.length });
				} catch (error) {
					console.log(error);
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

				let sql = `DELETE FROM brands WHERE id=${req.query.id};`;
				try {
					const result = await executeQuery({ query: sql });
					res.status(200).send({ message: 'Brand Deleted Successfully' });
				} catch (error) {
					console.log(error);
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
					const { name, category_id } = fields;
					console.log('Fields', fields);
					let imageFile = '';
					let isFiles = Object.keys(files).length > 0;
					if (isFiles) {
						imageFile = await saveFile(files, 'image', `brands-${fields.name}`);
					}
					let sql = `UPDATE brands SET name = '${name}',category_id=${category_id} WHERE id =${req.query.id}`;

					if (isFiles) {
						sql = `UPDATE brands SET name = '${name}',category_id=${category_id}, image='${imageFile}' WHERE id =${req.query.id}`;
					}
					try {
						let result = await executeQuery({ query: sql });
						// console.log(result);
						res
							.status(200)
							.send({ success: true, message: 'Brand Updated Successfully' });
					} catch (error) {
						res.status(400).json({ success: false, error: error });
					}
				});
			} catch (error) {
				console.log(error);
				res.status(400).json({ success: false, error });
			}
			break;
		default:
			// res.status(400).json({ success: false });
			break;
	}
}
