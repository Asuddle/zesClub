import formidable, { IncomingForm } from 'formidable';

import bcrypt from 'bcryptjs';
import db from '../../../util/mongodb';
import fs from 'fs';
import multer from 'multer';
import nextConnect from 'next-connect';
import nodemailer from 'nodemailer';

function sendMail(email) {
	let transporter = nodemailer.createTransport({
		service: 'gmail',
		secure: false, // use SSL
		port: 25,
		auth: {
			user: 'ahmad.suddle@gmail.com',
			pass: 'urglfglbmllpfrti',
		},
		tls: {
			rejectUnauthorized: false,
		},
	});
	let mailOptions = {
		from: 'ahmad.suddle@gmail.com',
		to: email,
		subject: 'Congratulations! you have successfully registered',
		text: 'You have successfully regsitered in ZeSClub,Ther admin will shortly approve you',
	};
	transporter.sendMail(mailOptions, function (error, info) {
		if (error) {
			console.log(error);
		} else {
			console.log('Email sent: ' + info.response);
		}
	});
}
export const config = {
	api: {
		bodyParser: false,
	},
};
export const saveFile = async (file, fileName = 'profilePhoto') => {
	const data = fs.readFileSync(file[fileName].filepath);
	fs.writeFileSync(`./public/${file[fileName].originalFilename}`, data);
	await fs.unlinkSync(file[fileName].filepath);
	return;
};

export default async function handler(req, res) {
	const { method } = req;

	switch (method) {
		case 'POST':
			try {
				const form = new formidable.IncomingForm();
				form.parse(req, async function (err, fields, files) {
					const {
						email,
						password,
						role,
						title,
						firstName,
						lastName,
						middleName,
						country,
						city,
						nationality,
						profession,
						emiratesID,
						mobile,
						haveOwnBusiness,
						industrySector,
						website,
						hobbies,
						interest,
						age,
						weight,
						makeHappy,
						expectations,
					} = fields;
					const hash = await bcrypt.hash(password, 10);
					let sql = `INSERT INTO user(email,password,role) VALUES ('${email}','${hash}','user')`;
					await db.query(sql, async (err, result) => {
						if (err) {
							res.send({ err });
						}
						let sqlCustomer = ``;
						try {
							await saveFile(files);
							if (
								fields.spouse_title &&
								fields.spouse_firstName &&
								fields.spouse_lastName &&
								fields.spouse_profession
							) {
								sqlCustomer = `INSERT INTO customers(title,firstName,lastName,middleName,country,city,nationality,profession,emiratesID,
									spouse_title,spouse_firstName,spouse_lastName,spouse_middleName,spouse_country,spouse_city,spouse_nationality,spouse_profession,spouse_emiratesID
									mobile,haveOwnBusiness,industrySector,website,hobbies,interest,age,weight,makeHappy,expectations,photo,user_id) VALUES
								('${title}','${firstName}','${lastName}','${
									middleName || ''
								}','${country}','${city}','${nationality}','${profession}','${emiratesID}'
								
								'${fields.spouse_title}','${fields.spouse_firstName}','${
									fields.spouse_lastName
								}','${fields.spouse_middleName || ''}','${
									fields.spouse_country
								}','${fields.spouse_city}','${fields.spouse_nationality}','${
									fields.spouse_profession
								}','${
									fields.spouse_emiratesId
								}','${mobile}','${haveOwnBusiness}','${industrySector}','${website}','${hobbies}','${interest}','${age}','${weight}','${makeHappy}','${expectations}','/${
									files.profilePhoto.originalFilename
								}','${result.insertId}')`;
							} else {
								sqlCustomer = `INSERT INTO customers(title,firstName,lastName,middleName,country,city,nationality,profession,emiratesID,mobile,haveOwnBusiness,industrySector,website,hobbies,interest,age,weight,makeHappy,expectations,photo,user_id) VALUES
								('${title}','${firstName}','${lastName}','${
									middleName || ''
								}','${country}','${city}','${nationality}','${profession}','${emiratesID}','${mobile}','${haveOwnBusiness}','${industrySector}','${website}','${hobbies}','${interest}','${age}','${weight}','${makeHappy}','${expectations}','/${
									files.profilePhoto.originalFilename
								}','${result.insertId}')`;
							}
							await db.query(sqlCustomer, (err, result) => {
								if (err) {
									res.send({ err });
								}
								sendMail(email);
								res.status(201).send({ message: 'User Create Successfully' });
							});
						} catch (error) {
							console.log('here', error);
							res.status(400).json({ success: false, error: error });
						}
					});
				});

				// console.log(req.body);
			} catch (error) {
				console.log(error);
				res.status(400).json({ success: false, error: error });
			}
			break;
		case 'GET':
			try {
				let sql = `SELECT * FROM user INNER JOIN customers ON user.id=customers.user_id where role='user';`;
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
				let sql = "DELETE FROM user WHERE address = 'Mountain 21'";
			} catch (error) {
				res.status(400).json({ success: false, error: error });
			}
			break;
		default:
			res.status(400).json({ success: false });
			break;
	}
}
