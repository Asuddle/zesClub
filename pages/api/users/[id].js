import formidable, { IncomingForm } from 'formidable';

import db from '../../../util/mongodb';

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
							console.log(fields);
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
			} catch (error) {
				res.status(400).json({ success: false, error: error });
			}
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
