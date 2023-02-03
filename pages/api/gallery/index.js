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
					const { event_id } = fields;
					await saveFile(files, 'image');
					let sql = `INSERT INTO gallery(event_id, image) VALUES('${event_id}','${files.image.originalFilename}')`;
					try {
						let result = await executeQuery({ query: sql });
						console.log(result);
						res
							.status(201)
							.send({ success: true, message: 'Image Created Successfully' });
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
				let sql = `SELECT * FROM gallery where event_id = ${req.query.id};`;
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
		case 'DELETE':
			try {
				let sql = `DELETE FROM gallery WHERE id=${req.query.id};`;
				try {
					const result = await executeQuery({ query: sql });
					res
						.status(200)
						.send({ message: 'Gallery Image Deleted Successfully' });
				} catch (error) {
					res.status(400).json({ success: false, error: error });
				}
			} catch (error) {
				res.status(400).json({ success: false, error: error });
			}
			break;

		default:
			// res.status(400).json({ success: false });
			break;
	}
}
