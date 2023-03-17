import fs from 'fs';
import nodemailer from 'nodemailer';

export async function sendBookedTickets(email, event, date, img, eventData) {
	let transporter = nodemailer.createTransport({
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

	mailData = {
		from: 'zuyyanazaidi@zesclub.com',
		to: email,
		subject: `Congratulations! you have booked a pass of ${event} at ${eventData.venue}`,
		text: `We are pleased to tell that you have successfully registered into the ${event} on ${date}`,
		attachments: [
			{
				filename: img,
				path: `public/${img}`,
				cid: img, //same cid value as in the html img src
			},
		],
		html: `<div>
                <img src="cid:${img}"/>
                <br/>
                <p> <strong>Name</strong> : ${event}</p>
                <p> <strong>Date</strong> : ${date}</p>
                <p><strong>Audience</strong>: ${eventData.audience}</p>
                <p><strong>Description</strong>: ${eventData.description}</p>
                </div>`,
	};

	await new Promise((resolve, reject) => {
		// verify connection configuration
		transporter.verify(function (error, success) {
			if (error) {
				console.log('dsadasd', error);
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
