import 'bootstrap/dist/css/bootstrap.min.css';

import {
	CardElement,
	Elements,
	useElements,
	useStripe,
} from '@stripe/react-stripe-js';

import { Alert } from '@mui/material';
import Head from 'next/head';
import axios from 'axios';
import { loadStripe } from '@stripe/stripe-js';
import styles from '../../../../styles/user.module.scss';
import { useRouter } from 'next/router';
import { useState } from 'react';

const options = {
	clientSecret:
		'sk_test_51MeHNIE5KELY3WjBQL8pR4oxv8UTGcnINLxWCsrSZUGdFHb88cQHtqz6S0pScSTWHK4zrqC6bdElTgLHp6DJIbWc00EjLCjEEf',
};
const CheckoutForm = ({ data }) => {
	const stripe = useStripe();
	const router = useRouter();
	const elements = useElements();
	const [errorMessage, setErrorMessage] = useState('');
	const [success, setSuccess] = useState(false);
	let userData = {};
	if (typeof window !== 'undefined') {
		// Perform localStorage action
		userData = JSON.parse(localStorage.getItem('userData'));
	}
	const handleSubmit = async (event) => {
		event.preventDefault();
		const billingDetails = {
			name: userData.email,
			email: userData.email,
			address: {
				city: 'Dubai',
				line1: '',
				state: '',
				postal_code: '',
			},
		};

		if (elements == null) {
			return;
		}
		if (!stripe || !elements) {
			// Stripe.js has not yet loaded.
			// Make sure to disable form submission until Stripe.js has loaded.
			return;
		}
		const { error, paymentMethod } = await stripe.createPaymentMethod({
			type: 'card',
			card: elements.getElement(CardElement),
			billing_details: billingDetails,
		});

		const config = {
			headers: { 'Content-Type': 'application/json' },
		};
		try {
			const response = await axios.post(
				'/api/payment',
				{
					// amount: 999,
					paymentMethod: paymentMethod.id,
					name: userData.email,
					email: userData.email,
					price: data.price,
					event: data.name,
					// id: paymentMethod.id,
				},
				config,
			);
			// console.log('ree', response.data.paymentIntent.client_secret);

			// console.log('response', response.data.paymentIntent.client_secret);

			if (error) {
				setErrorMessage(error.message);
				return;
			}

			const confirmPayment = await stripe.confirmCardPayment(
				response.data.paymentIntent.client_secret,
			);

			if (confirmPayment.error) {
				setErrorMessage(error.message);
				return;
			}
			axios
				.post('/api/booking', {
					is_paid: 1,
					event_id: data.id,
					user_id: userData.id,
				})
				.then((res) => {
					// setSuccess(true);
					router.push('/user/bookings');
					console.log(res.data);
				})
				.catch((err) => {
					console.log(err);
				});
		} catch (error) {
			console.log(error);
		}
	};

	// Handle Timeout

	const handleTimeout = () => {
		setTimeout(() => {
			router.push('/user/events');
		}, 3000);
	};

	return (
		<div>
			{errorMessage && (
				<Alert style={{ marginBottom: '12px' }} severity='error'>
					{errorMessage}
				</Alert>
			)}
			{!success ? (
				<form onSubmit={handleSubmit}>
					<div class='form-group'>
						<label for='card-element'>
							<h5>Credit or debit card</h5>
						</label>
						<div
							id='card-element'
							class='form-control'
							style={{ height: '2.4em', paddingTop: '.7em' }}
						>
							<CardElement />
							<br />
							<br />
							<button
								type='submit'
								disabled={!stripe || !elements}
								className={styles.buyTicketButton}
							>
								Pay
							</button>
						</div>
					</div>
				</form>
			) : (
				<>
					<Alert>
						Congratulation! your payment is successfully transactioned.
					</Alert>
					{handleTimeout()}
				</>
			)}
		</div>
	);
};
const stripePromise = loadStripe(
	'pk_test_51MeHNIE5KELY3WjBC3WTQKSK8eh57BkRbAiWdYNEVHXRKO7JL5KNdTtxjtSKFCqliyf44KAIik8pn6RNMB8lLcSp00u3VRQQVX',
);

export default function EventPayment({ data }) {
	return (
		<Elements stripe={stripePromise}>
			<CheckoutForm data={data} />
		</Elements>
	);
}
