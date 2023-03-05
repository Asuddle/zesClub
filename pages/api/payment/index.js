import Stripe from 'stripe';
const stripe = new Stripe(
	'sk_test_51MeHNIE5KELY3WjBQL8pR4oxv8UTGcnINLxWCsrSZUGdFHb88cQHtqz6S0pScSTWHK4zrqC6bdElTgLHp6DJIbWc00EjLCjEEf',
);
async function createSubscription(createSubscriptionRequest, res) {
	// create a stripe customer
	const customer = await stripe.customers.create({
		name: createSubscriptionRequest.name,
		email: createSubscriptionRequest.email,
		payment_method: createSubscriptionRequest.paymentMethod,
		invoice_settings: {
			default_payment_method: createSubscriptionRequest.paymentMethod,
		},
	});
	// get the price id from the front-end
	const price = createSubscriptionRequest.price;

	// create a stripe subscription
	// const subscription = await stripe.subscriptions.create({
	// 	customer: customer.id,
	// 	items: [{ price: priceId }],
	// 	payment_settings: {
	// 		payment_method_types: ['card'],
	// 		save_default_payment_method: 'on_subscription',
	// 	},
	// 	expand: ['latest_invoice.payment_intent'],
	// });
	const paymentIntent = await stripe.paymentIntents.create({
		amount: price * 100,
		currency: 'aed',
		customer: customer.id,
		payment_method: createSubscriptionRequest.paymentMethod,
		confirmation_method: 'automatic', // For 3D Security
		description: createSubscriptionRequest.event,
	});

	// return the client secret and subscription id
	res.status(200).json({
		paymentIntent: paymentIntent,
	});
}

//

export default async function handler(req, res) {
	const { method, body } = req;

	switch (method) {
		case 'POST':
			try {
				// res.status(200).json({ data: {} });
				await createSubscription(req.body, res);
			} catch (error) {
				res.status(400).json({ success: false, error: error });
			}
			break;
		default:
			// res.status(400).json({ success: false });
			break;
	}
}
