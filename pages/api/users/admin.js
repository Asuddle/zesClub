import db from '../../../util/mongodb';

export default async function handler(req, res) {
	const { method } = req;

	switch (method) {
		case 'POST':
			break;
		case 'GET':
			try {
				let qr = req.query.q || '';
				let sql = `SELECT * FROM user INNER JOIN customers ON user.id=customers.user_id WHERE role="admin"
				 and (email like '%${qr}%' or
					firstName like  '%${qr}%' or
				      lastName like  '%${qr}%' or lastName like  '%${qr}%' or country  like  '%${qr}%' or city like  '%${qr}%') ;`;
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
				let cusSql = `DELETE FROM customers WHERE user_id='${req.query.userId}';`;
				let sql = `DELETE FROM user WHERE id='${req.query.userId}';`;
				await db.query(cusSql, async (err, result) => {
					if (err) {
						res.send(err);
					}
					await db.query(sql, (err, result) => {
						if (err) {
							res.send({
								success: false,
								message: 'Customer Deleted but user is still there',
							});
						}
						res.status(200).send({ message: 'User Delete Successfully' });
					});
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
