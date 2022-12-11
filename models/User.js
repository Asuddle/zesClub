// models/User.js

import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
	title: {
		type: String,
		required: true,
	},
	firstName: {
		type: String,
		required: true,
	},
	lastName: {
		type: String,
		required: true,
	},
	middleName: {
		type: String,
	},
	email: {
		type: String,
		required: true,
		unique: true,
	},
	country: {
		type: String,
		required: true,
	},
	city: { type: String, required: true },
	nationality: { type: String },
	profession: { type: String, required: true },
	emiratesID: { type: String, required: true },
	mobile: { type: String, required: true },
	password: { type: String, required: true },
	haveOwnBusiness: { type: Boolean, default: false },
	industrySector: { type: String },
	website: { type: String },
	hobbies: { type: String },
	interest: { type: String },
	height: { type: String },
	age: { type: String },
	weight: { type: String },
	makeHappy: { type: String },
	expectations: { type: String },
	photo: { type: String },
	role: { type: String, default: 'User' },
	isVerified: { type: Boolean, default: false },
});

module.exports = mongoose.models.User || mongoose.model('User', UserSchema);
