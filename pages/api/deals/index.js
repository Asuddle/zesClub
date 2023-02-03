import executeQuery from '../../../util/mongodb';
// import db from '../../../util/mongodb';
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
				const userValue = {
					name: 'name',
					description: 'description',
					brand_id: 'brand_id',
					price: 'price',
				};
				let labelStr = '';
				let valueStr = '';

				const form = new formidable.IncomingForm();
				form.parse(req, async function (err, fields, files) {
					if (err) {
						res.send({ err });
					}
					let fileName = await saveFile(files, 'image', `deal-${fields.name}`);

					for (const key in userValue) {
						if (fields[key]) {
							labelStr = labelStr + userValue[key] + ', ';
							valueStr = valueStr + `'${fields[key]}'` + ',';
						}
					}
					labelStr = labelStr + 'image';
					valueStr = valueStr + `'${fileName}'`;

					let sql = `INSERT INTO deals(${labelStr}) VALUES(${valueStr})`;
					try {
						let result = await executeQuery({ query: sql });

						res
							.status(201)
							.send({ success: true, message: 'Deals Created Successfully' });
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
				let sql = `SELECT brands.name as  brands ,deals.name,deals.image,deals.id,deals.createdDate,deals.description,deals.price FROM deals INNER JOIN brands ON brands.id=deals.brand_id where brands.name like '%${qr}%';`;
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
				let sql = `DELETE FROM deals WHERE id=${req.query.id};`;
				try {
					const result = await executeQuery({ query: sql });
					res.status(200).send({ message: 'Deals Deleted Successfully' });
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
				const form = new formidable.IncomingForm();
				form.parse(req, async function (err, fields, files) {
					if (err) {
						res.send({ err });
					}
					const { name, brand_id, price, description } = fields;

					let isFiles = Object.keys(files).length > 0;
					let imageFile = '';
					let sql = '';
					if (isFiles) {
						imageFile = await saveFile(files, 'image', `deal-${fields.name}`);
						sql = `UPDATE deals SET name = '${name}',brand_id=${parseInt(
							brand_id,
						)},description='${description}',price='${price}', image='${imageFile}' WHERE id =${
							req.query.id
						}`;
					} else {
						sql = `UPDATE deals SET name = '${name}',brand_id=${parseInt(
							brand_id,
						)},price='${price}',description='${description}' WHERE id =${
							req.query.id
						}`;
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
