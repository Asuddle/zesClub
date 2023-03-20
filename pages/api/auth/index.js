import formidable, { IncomingForm } from 'formidable';

import bcrypt from 'bcryptjs';
import executeQuery from '../../../util/mongodb';
import fs from 'fs';
import nodemailer from 'nodemailer';
import { verifyJwt } from '../../../util/jwtVerify';

async function sendMail(email, res, admin = false) {
	let transporter = nodemailer.createTransport({
		// service: 'gmail',
		host: 'zesclub.com',
		secure: true, // use SSLs
		port: 465,
		auth: {
			user: 'ataimoor@zesclub.com',
			pass: 'librasuddle12',
		},
		tls: {
			rejectUnauthorized: false,
		},
	});
	let mailData = {};
	if (!admin) {
		mailData = {
			from: 'zuyyanazaidi@zesclub.com',
			to: email,
			subject: 'Congratulations! you have successfully registered',
			text: 'You have successfully registered in ZeSClub,Ther admin will shortly approve you',
		};
	} else {
		mailData = {
			from: 'zuyyanazaidi@zesclub.com',
			to: 'zuyyanazaidi@zesclub.com',
			subject: `New Customer Registration`,
			text: `A new customer ${email} registered into the system`,
		};
	}

	await new Promise((resolve, reject) => {
		// verify connection configuration
		transporter.verify(function (error, success) {
			if (error) {
				console.log(error);
				reject(error);
			} else {
				console.log('Server is ready to take our messages');
				resolve(success);
			}
		});
	});

	await new Promise((resolve, reject) => {
		// send mail
		transporter.sendMail(mailData, (err, info) => {
			if (err) {
				console.error(err);
				// res.json({ data: err });
				reject(err);
			} else {
				console.log(info);
				// res.json({ data: info });
				resolve(info);
			}
		});
	});
}

export const config = {
	api: {
		bodyParser: false,
	},
};
export const saveFile = async (
	file,
	fileName = 'profilePhoto',
	attachment = '',
) => {
	const data = fs.readFileSync(file[fileName].filepath);

	fs.writeFileSync(
		`./public/${attachment}-${file[fileName].originalFilename}`,
		data,
	);
	await fs.unlinkSync(file[fileName].filepath);
	return `${attachment}-${file[fileName].originalFilename}`;

	// fs.writeFileSync(
	// 	`./public/${attachment}${file[fileName].originalFilename}`,
	// 	data,
	// );
	// await fs.unlinkSync(file[fileName].filepath);
	// return `${attachment}${file[fileName].originalFilename}`;
};

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
export default async function handler(req, res) {
	const { method } = req;

	switch (method) {
		case 'POST':
			try {
				const form = new formidable.IncomingForm();
				form.parse(req, async function (err, fields, files) {
					const { email, password, role = 'user' } = fields;
					const hash = await bcrypt.hash(password, 10);
					let sql = `INSERT INTO user(email,password,role) VALUES ('${email}','${hash}','${role}')`;
					try {
						let result = await executeQuery({ query: sql });
						try {
							let photoFile = '';
							if (files.photo) {
								photoFile = await saveFile(
									files,
									'photo',
									`photo-${fields.email}`,
								);
							}
							let emiratesIDFileName = '';
							if (files.emiratesIdFile) {
								emiratesIDFileName = await saveFile(
									files,
									'emiratesIdFile',
									`emirateId-${fields.email}`,
								);
							}
							console.log(emiratesIDFileName, photoFile);
							let labelStr = '';
							let valueStr = '';
							// res.send({});
							for (const key in userValue) {
								if (fields[key]) {
									labelStr = labelStr + userValue[key] + ', ';
									valueStr = valueStr + `'${fields[key]}'` + ',';
								}
							}
							labelStr = labelStr + 'photo' + ',';
							valueStr = valueStr + `'${photoFile}'` + ',';

							labelStr = labelStr + 'emiratesIdFile' + ',';
							valueStr = valueStr + `'${emiratesIDFileName}'` + ',';

							labelStr = labelStr + 'user_id';
							valueStr = valueStr + `'${result.insertId}'`;

							let sqlCustomer = `INSERT INTO customers(${labelStr}) VALUES  (${valueStr})`;

							try {
								try {
									let ress = await executeQuery({ query: sqlCustomer });
									await sendMail(email, res);
									await sendMail(email, res, true);
									res.status(201).send({
										success: true,
										message: 'Customer added successfully',
									});
								} catch (error) {
									console.log(error);
									res.status(400).json({ success: false, error: error });
								}
								// await sendMail('ahmad.suddle@gmail.c', res);
							} catch (error) {
								res.status(400).json({ success: false, error: error });
							}
						} catch (error) {
							console.log('here', error);
							res.status(400).json({ success: false, error: error });
						}
					} catch (error) {
						res.status(400).json({ success: false, error: error });
					}
				});

				// console.log(req.body);
			} catch (error) {
				console.log(error);
				res.status(400).json({ success: false, error: error });
			}
			break;
		case 'GET':
			try {
				let sql = `SELECT * FROM user where role='user';`;
				try {
					let result = await executeQuery({ query: sql });
					res.status(200).send({
						success: true,
						data: result,
					});
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
				let result = await executeQuery({ query: sql });
				res.status(200).send({
					success: true,
					message: 'Customer deleted successfully',
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
