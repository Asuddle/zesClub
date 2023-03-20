import executeQuery from './mongodb';
import jwt from 'jsonwebtoken';

export const verifyJwt = async (token, res) => {
	jwt.verify(token, 'newsecret', async function (err, decoded) {
		if (err) {
			console.log('err', err);
			res.status(401).send({ message: 'Authentication failed' });
		} else {
			console.log('decoded', decoded);
			let sql = `SELECT * FROM user where email='${decoded.sub}'`;
			try {
				const result = await executeQuery({ query: sql });
				if (result.length == 0) {
					res
						.status(401)
						.json({ success: false, error: 'Authentication failed' });
				}
				console.log('result', result);
			} catch (error) {
				res.status(401).json({ success: false, error: error });
			}
		}
	});
	// jwt.verify(token, 'newsecret', function (err, decoded) {
	// 	console.log(decoded); // bar
	// });
};
