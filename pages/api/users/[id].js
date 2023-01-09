import formidable, { IncomingForm } from 'formidable';

import db from '../../../util/mongodb';
import { saveFile } from '../auth';

const userValue = {
	// email: 'email',
	title: 'title',
	firstName: 'firstName',
	lastName: 'lastName',
	middleName: 'middleName',
	country: 'country',
	city: 'city',
	nationality: 'nationality',
	profession: 'profession',
	emiratesID: 'emiratesID',
	mobile: 'mobile',
	haveOwnBusiness: 'haveOwnBusiness',
	industrySector: 'industrySector',
	website: 'website',
	hobbies: 'hobbies',
	interest: 'interest',
	age: 'age',
	weight: 'weight',
	makeHappy: 'makeHappy',
	expectations: 'expectations',
	height: 'height',
	spouse_title: 'spouse_title',
	spouse_firstName: 'spouse_firstName',
	spouse_middleName: 'spouse_middleName',
	spouse_lastName: 'spouse_lastName',
	spouse_country: 'spouse_country',
	spouse_city: 'spouse_city',
	spouse_nationality: 'spouse_nationality',
	spouse_profession: 'spouse_profession',
	spouse_emiratesID: 'spouse_emiratesID',
};
export const config = {
	api: {
		bodyParser: false,
	},
};
export default async function handler(req, res) {
	const { method } = req;

	switch (method) {
		case 'POST':
			break;
		case 'GET':
			try {
				let sql = `SELECT * FROM user INNER JOIN customers ON user.id=customers.user_id where user_id=${req.query.id};`;
				await db.query(sql, (err, result) => {
					if (err) {
						res.send(err);
					}
					res.status(200).send({ data: result });
				});
			} catch (error) {
				res.status(400).json({ success: false, error: error });
			}
			break;
		case 'PUT':
			try {
				const form = new formidable.IncomingForm();
				form.parse(req, async function (err, fields, files) {
					let cond = '';
					for (const key in fields) {
						if (userValue[key]) {
							cond = cond + `${userValue[key]}='${fields[key] || ''}' ,`;
						}
					}
					cond = cond.slice(0, -1);

					if (Object.keys(files).length > 0) {
						saveFile(files, 'photo');
						cond = cond + `, photo='${files.photo.originalFilename}'`;
					}

					// res.send({ cond });
					let sql = `UPDATE customers SET ${cond} WHERE user_id = ${req.query.id}`;
					await db.query(sql, async (err, result) => {
						if (err) {
							res.send(err);
						}
						res.status(200).send({ message: 'Entry Updated Successfully' });
					});
				});
			} catch (error) {
				res.status(400).json({ success: false, error: error });
			}
			break;
		case 'DELETE':
			try {
				let sql = `DELETE FROM customers WHERE user_id = ${req.query.id}`;
				await db.query(sql, async (err, result) => {
					if (err) {
						res.send(err);
					}
					let sql1 = `DELETE FROM user WHERE id = ${req.query.id}`;
					await db.query(sql1, (err, result) => {
						if (err) {
							res.send(err);
						}
					});
					res.status(200).send({ message: 'Entry Deleted Successfully' });
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
