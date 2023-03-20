import executeQuery from '../../../util/mongodb';
import { verifyJwt } from '../../../util/jwtVerify';

export default async function handler(req, res) {
	const { method } = req;

	switch (method) {
		case 'POST':
			const { email, firstName, lastName, enquiryType, title, message } =
				req.body;
			let sql = `INSERT INTO enquiry(email, firstName, lastName, enquiryType, title, message) VALUES ('${email}','${firstName}','${lastName}','${enquiryType}','${title}','${message}');`;

			try {
				let result = await executeQuery({ query: sql });
				console.log(result);
				res
					.status(201)
					.send({ success: true, message: 'Enquiry Created Successfully' });
			} catch (error) {
				res.status(400).json({ success: false, error: error });
			}

			break;
		case 'GET':
			try {
				let authheader = req.headers.authorization;
				await verifyJwt(authheader, res);

				let sql = `SELECT * FROM enquiry where email like '%${req.query.q}%' or firstName like  '%${req.query.q}%' or lastName like  '%${req.query.q}%' or enquiryType like  '%${req.query.q}%' ;`;

				// select * from User where fullname like %? or facebook = ? or email = ? limit 50", keyword,keyword,keyword,

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
				let authheader = req.headers.authorization;
				await verifyJwt(authheader, res);

				let sql = `DELETE FROM enquiry WHERE id='${req.query.id}';`;
				try {
					const result = await executeQuery({ query: sql });
					res.status(200).send({ message: 'Enquiry Deleted Successfully' });
				} catch (error) {
					console.log(error);
					res.status(400).json({ success: false, error: error });
				}
			} catch (error) {
				res.status(400).json({ success: false, error: error });
			}
			break;
		default:
			res.status(400).json({ success: false });
			break;
	}
}
