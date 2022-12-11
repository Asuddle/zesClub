import bcrypt from 'bcryptjs';

export const hashPassword = (salt, password) => {
	return new Promise(function (resolve, reject) {
		try {
			bcrypt.genSalt(salt, function (err, salt) {
				bcrypt.hash(password, salt, async (err, hash) => {
					if (err) {
						reject(err);
					} else {
						resolve(hash);
					}
				});
			});
		} catch (error) {
			reject(error);
		}
	});
};

export const compareAsyncPassword = (hash, password) => {
	return new Promise(function (resolve, reject) {
		try {
			bcrypt.compare(password, hash, (err, res) => {
				if (err) {
					reject(err);
				} else {
					resolve(res);
				}
			});
		} catch (error) {
			reject(error);
		}
	});
};
