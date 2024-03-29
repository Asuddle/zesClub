import executeQuery from '../../../../util/mongodb';

export default async function handler(req, res) {
	const { method } = req;

	switch (method) {
		case 'GET':
			try {
				let sql = `SELECT deals.name,deals.image,deals.brand_id,deals.description,deals.qr,deals.price,brands.image as brand_image  from deals INNER JOIN brands ON deals.brand_id=brands.id where brand_id=${req.query.id};`;
				let result = await executeQuery({ query: sql });
				res.status(200).send({
					success: true,
					data: result,
				});
			} catch (error) {
				res.status(400).json({ success: false, error: error });
			}
			break;
		default:
			res.status(400).json({ success: false });
			break;
	}
}
