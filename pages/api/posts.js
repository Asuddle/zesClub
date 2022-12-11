// import dbConnect from '../../util/mongodb';

// export default async function handler(req, res) {
// 	dbConnect();
// 	switch (req.method) {
// 		case 'POST':
// 			let bodyObject = req.body;
// 			console.log(req.body);
// 			let myPost = await db.collection('posts').insertOne(bodyObject);
// 			res.json(myPost);
// 			break;
// 		case 'GET':
// 			// const allPosts = await db.collection('allPosts').find({}).toArray();
// 			res.json({ status: 200, data: process.env.MONGODB_URI });
// 			break;
// 	}
// }
