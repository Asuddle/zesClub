import executeQuery from '../../../util/mongodb';
import jwt from 'jsonwebtoken';
import nodemailer from 'nodemailer';

async function sendResetEmail(email, token) {
	console.log(email, token);
	console.log('Token', token);
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
	// let transporter = nodemailer.createTransport({
	// 	service: 'gmail',
	// 	secure: false, // use SSL
	// 	port: 25,
	// 	auth: {
	// 		user: 'ahmad.suddle@gmail.com',
	// 		pass: 'urglfglbmllpfrti',
	// 	},
	// 	tls: {
	// 		rejectUnauthorized: false,
	// 	},
	// });

	var mailOptions = {
		from: 'zuyyanazaidi@zesclub.com',
		to: email,
		subject: 'Reset Password Link ',
		html: `<p>You requested for reset password, kindly use this <a href="http://localhost:3000/forgot-password/${token}/${email}">link</a> to reset your password</p>`,
	};
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
		transporter.sendMail(mailOptions, (err, info) => {
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

export default async function handler(req, res) {
	const { method } = req;

	switch (method) {
		case 'POST':
			try {
				let sql = `SELECT * FROM user where role='user' AND email='${req.body.email}';`;
				try {
					let result = await executeQuery({ query: sql });
					if (result.length > 0) {
						// var token =
						// randtoken.generate(20);
						// console.log(result.length, token);
						let email = result[0].email;

						let token =
							Math.floor(Math.random() * 900000000000000) + 100000000000000;

						var sent = await sendResetEmail(result[0].email, token);
						console.log(sent);
						if (sent != '0') {
							let sql = `UPDATE user SET token='${token}'where email ='${email}'`;
							let rrrr = await executeQuery({
								query: sql,
							});

							let type = 'success';
							let msg = 'The reset link has been sent to your email';
							res.send({ success: true, msg: msg });
						} else {
							let type = 'error';
							let msg = 'Something goes to wrong. Please try again';

							res.status(400).send({ success: true, msg: msg });
						}
					} else {
						res.status(400).json({ success: false, error: 'No email found' });
					}

					// res.status(200).send({
					// 	success: true,
					// 	data: result,
					// });
				} catch (error) {
					console.log(error);
					res.status(400).json({ success: false, error: error });
				}
			} catch (error) {
				console.log(error);
				res.status(400).json({ success: false, error: error });
			}
			break;
		case 'GET':
			break;
		case 'DELETE':
			break;
		default:
			res.status(400).json({ success: false });
			break;
	}
}
