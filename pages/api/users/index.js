import executeQuery from '../../../util/mongodb';
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
				const { email, password, role } = req.body;
				const hash = await bcrypt.hash(password, 10);
				let sql = `INSERT INTO user(email,password,role) VALUES ('${email}','${hash}','${role}')`;
				try {
					let result = await executeQuery({ query: sql });
					let labelStr = '';
					let valueStr = '';
					for (const key in userValue) {
						if (req.body[key]) {
							labelStr = labelStr + userValue[key] + ', ';
							valueStr = valueStr + `'${req.body[key]}'` + ',';
						}
					}
					labelStr = labelStr + 'user_id';
					valueStr = valueStr + result.insertId;

					let sqlCustomer = `INSERT INTO customers(${labelStr}) VALUES  (${valueStr})`;
					try {
						let result = await executeQuery({ query: sqlCustomer });
						// console.log(result);
						sendMail(email);
						res
							.status(201)
							.send({ success: true, message: 'Brands Created Successfully' });
					} catch (error) {
						res.status(400).json({ success: false, error: error });
					}
				} catch (error) {
					res.status(400).json({ success: false, error: error });
				}
			} catch (error) {
				res.status(400).json({ success: false, error: error });
			}
			break;
		case 'GET':
			try {
				let qr = req.query.q || '';
				let sql = `SELECT * FROM user INNER JOIN customers ON user.id=customers.user_id where role='user' and (email like '%${qr}%' or
				firstName like  '%${qr}%' or
			      lastName like  '%${qr}%' or lastName like  '%${qr}%' or country  like  '%${qr}%' or city like  '%${qr}%');`;
				try {
					const result = await executeQuery({ query: sql });
					res.status(200).send({ data: result, totalCount: result.length });
				} catch (error) {
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
