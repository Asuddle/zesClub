import executeQuery from '../../../util/mongodb';
import formidable from 'formidable';
import fs from 'fs';
import { saveFile } from '../auth';
import { sendBookedTickets } from '../../../util/eventTicket';
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
					const { user_id, is_paid, event_id } = fields;

					let sql = `INSERT INTO bookings( user_id, is_paid, event_id) VALUES('${user_id}','${is_paid}','${event_id}')`;
					try {
						let result = await executeQuery({ query: sql });
						// console.log('Ress::: ', result);
						let userSql = `SELECT * from user where id = ${user_id}`;
						let eventSql = `SELECT * from events where id=${event_id}`;
						let userResult = await executeQuery({ query: userSql });
						let eventResult = await executeQuery({ query: eventSql });
						// console.log('=========================================');
						// console.log(userResult, eventResult);
						// console.log('=========================================');
						await sendBookedTickets(
							userResult[0].email,
							eventResult[0].name,
							eventResult[0].date,
							eventResult[0].image,
							eventResult[0],
						);

						res.status(201).send({
							success: true,
							message: 'Bookings Created Successfully',
						});
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
				let sql = `SELECT bookings.user_id,bookings.event_id,events.name as event_name ,events.price,events.image,customers.firstName,user.email,customers.lastName ,bookings.is_paid  
				FROM bookings 
				INNER JOIN events ON bookings.event_id=events.id
				INNER JOIN user ON bookings.user_id=user.id
				INNER JOIN customers ON bookings.user_id=customers.user_id;`;
				try {
					let result = await executeQuery({ query: sql });
					// console.log(result);
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

				let sql = `DELETE FROM bookings WHERE id=${req.query.id};`;
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
					const { name, description, price, audience, date, venue } = fields;
					//
					let isFiles = Object.keys(files).length > 0;
					if (isFiles) {
						await saveFile(files, 'image');
					}
					let sql = `UPDATE events SET name = '${name}', description = '${description}', price = '${price}',audience='${audience}',date='${date}',venue='${venue}' WHERE id =${req.query.id}`;

					if (isFiles) {
						sql = `UPDATE events SET name = '${name}', description = '${description}', price = '${price}',audience='${audience}',date='${date}',venue='${venue}',image='${files.image.originalFilename}' WHERE id =${req.query.id}`;
					}

					console.log(isFiles);
					try {
						await executeQuery({ query: sql });
						res
							.status(200)
							.json({ success: true, message: 'Event Updated Successfully' });
					} catch (error) {
						console.log(error);
						res.status(400).json({ success: false, error: error });
					}
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
