import formidable, { IncomingForm } from 'formidable';

import executeQuery from '../../../util/mongodb';
import { saveFile } from '../auth';
import { verifyJwt } from '../../../util/jwtVerify';

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
				let result = await executeQuery({ query: sql });

				res.status(200).send({
					success: true,
					data: result,
				});
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
					let cond = '';
					for (const key in fields) {
						if (userValue[key]) {
							cond = cond + `${userValue[key]}='${fields[key] || ''}' ,`;
						}
					}
					cond = cond.slice(0, -1);

					if (Object.keys(files).length > 0) {
						if (files.photo) {
							let photoFile = await saveFile(files, 'photo', fields.email);
							cond = cond + `, photo='${photoFile}'`;
						} else if (files.emiratesIdFile) {
							let emiratesIdFile = await saveFile(
								files,
								'emiratesIdFile',
								fields.email,
							);
							cond = cond + `, emiratesIdFile='${emiratesIdFile}'`;
						}
					}

					// res.send({ cond });
					let sql = `UPDATE customers SET ${cond} WHERE user_id = ${req.query.id}`;
					console.log(sql);
					try {
						let result = await executeQuery({ query: sql });
						// console.log(result);
						res
							.status(200)
							.send({ success: true, message: 'Entry Updated Successfully' });
					} catch (error) {
						res.status(400).json({ success: false, error: error });
					}
				});
			} catch (error) {
				res.status(400).json({ success: false, error: error });
			}
			break;
		case 'DELETE':
			try {
				let authheader = req.headers.authorization;
				await verifyJwt(authheader, res);

				let sql = `DELETE FROM customers WHERE user_id = ${req.query.id}`;
				try {
					const result = await executeQuery({ query: sql });
					let sql1 = `DELETE FROM user WHERE id = ${req.query.id}`;
					try {
						await executeQuery({ query: sql1 });
						res.status(200).send({ message: 'User Deleted Successfully' });
					} catch (error) {
						res.status(400).json({ success: false, error: error });
					}
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
