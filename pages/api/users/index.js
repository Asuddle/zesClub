import db from '../../../util/mongodb';

export default async function handler(req, res) {
	const { method } = req;

	switch (method) {
		case 'POST':
			try {
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
					photo,
				} = req.body;
				const hash = await bcrypt.hash(password, 10);
				let sql = `INSERT INTO user(email,password,role) VALUES ('${email}','${hash}','${role}')`;

				await db.query(sql, async (err, result) => {
					if (err) {
						res.send({ err });
					}
					try {
						let sqlCustomer = `INSERT INTO customers(title,firstName,lastName,middleName,country,city,nationality,profession,emiratesID,mobile,haveOwnBusiness,industrySector,website,hobbies,interest,age,weight,makeHappy,expectations,photo,user_id) VALUES 
								('${title}','${firstName}','${lastName}','${
							middleName || ''
						}','${country}','${city}','${nationality}','${profession}','${emiratesID}','${mobile}','${haveOwnBusiness}','${industrySector}','${website}','${hobbies}','${interest}','${age}','${weight}','${makeHappy}','${expectations}','${photo}','${
							result.insertId
						}')`;

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
			} catch (error) {
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
		default:
			res.status(400).json({ success: false });
			break;
	}
}
