import db from '../../../util/mongodb';

export default async function handler(req, res) {
	const { method } = req;

	switch (method) {
		case 'POST':
			const { email, firstName, lastName, enquiryType, title, message } =
				req.body;
			let sql = `INSERT INTO enquiry(email, firstName, lastName, enquiryType, title, message) VALUES ('${email}','${firstName}','${lastName}','${enquiryType}','${title}','${message}');`;

			try {
				await db.query(sql, (err, result) => {
					if (err) {
						res.send({ err });
					}
					// sendMail(email);
					res.status(201).send({ message: 'Enquiry Sent Successfully' });
				});
			} catch (error) {
				res.status(400).json({ success: false, error: error });
			}
			break;
		case 'GET':
			try {
				let sql = `SELECT * FROM enquiry where email like '%${req.query.q}%' or firstName like  '%${req.query.q}%' or lastName like  '%${req.query.q}%' or enquiryType like  '%${req.query.q}%' ;`;

				// select * from User where fullname like %? or facebook = ? or email = ? limit 50", keyword,keyword,keyword,
				await db.query(sql, (err, result) => {
					if (err) {
						res.send(err);
					}
					// let finalFilData=await result.filter(item=>)
					res.status(200).send({ data: result, totalCount: result.length });
				});
			} catch (error) {
				res.status(400).json({ success: false, error: error });
			}
			break;
		case 'DELETE':
			try {
				let sql = `DELETE FROM enquiry WHERE id='${req.query.id}';`;
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
		default:
			res.status(400).json({ success: false });
			break;
	}
}
