import executeQuery from '../../../../util/mongodb';

// export const config = {
// 	api: {
// 		bodyParser: false,
// 	},
// };
export default async function handler(req, res) {
	const { method } = req;
	switch (method) {
		case 'GET':
			try {
				let sql = `SELECT bookings.user_id,bookings.event_id,events.name as event_name,events.date,events.audience ,events.venue,events.description,price,events.image,customers.firstName,user.email,customers.lastName ,bookings.is_paid  
				FROM bookings 
				INNER JOIN events ON bookings.event_id=events.id
				INNER JOIN user ON bookings.user_id=user.id
				INNER JOIN customers ON bookings.user_id=customers.user_id where bookings.user_id=${req.query.id};`;
				try {
					let result = await executeQuery({ query: sql });
					res.status(200).send({ data: result, totalCount: result.length });
				} catch (error) {
					console.log(error);
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
