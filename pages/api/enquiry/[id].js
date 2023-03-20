import db from '../../../util/mongodb';
import executeQuery from '../../../util/mongodb';

export default async function handler(req, res) {
	const { method } = req;

	switch (method) {
		case 'GET':
			try {
				let sql = `SELECT * FROM enquiry where id=${req.query.id};`;
				let result = await executeQuery({ query: sql });

				res.status(200).send({
					success: true,
					data: result,
				});
			} catch (error) {
				console.log(error);
				res.status(400).json({ success: false, error: error });
			}
			break;
		default:
			res.status(400).json({ success: false });
			break;
	}
}
