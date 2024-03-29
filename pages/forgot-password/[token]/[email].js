import * as yup from 'yup';

import {
	Col,
	FormFeedback,
	Input,
	InputGroup,
	InputGroupText,
	Row,
} from 'reactstrap';
import { Controller, useForm } from 'react-hook-form';
import { faLock, faUser } from '@fortawesome/free-solid-svg-icons';
import { useContext, useState } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Head from 'next/head';
import axios from 'axios';
import styles from '../../../styles/login.module.scss';
import { useRouter } from 'next/router';
import { yupResolver } from '@hookform/resolvers/yup';

export default function ResetPasswordPage() {
	const router = useRouter();
	const [errorMess, setErrorMess] = useState('');
	const handleRegister = () => {
		router.push('/register');
	};
	const handleForgotPassword = () => {
		router.push('/forgot-password');
	};

	const validationSchema = yup.object({
		password: yup
			.string()
			.required('Password is a required field')
			.min(8, 'Password should be at least 8 characters'),
		confirmPassword: yup
			.string()
			.required('Password is a required field')
			.min(8, 'Password should be at least 8 characters'),
	});
	const onSubmit = (data) => {
		console.log(data);
		if (data.password === data.confirmPassword) {
			console.log(router);
			const { token, email } = router.query;
			const dt = { ...data, ...{ token, email } };
			console.log(dt);
			axios
				.post('/api/auth/reset-password', dt)
				.then((res) => {
					console.log(res.data.data);
					setErrorMess(res.data.data);
					setTimeout(() => {
						router.push('/login');
					}, 2000);
				})
				.catch((err) => {
					console.log(err);
				});
		} else {
			setErrorMess('Please enter same password and confirm password');
		}
	};

	const {
		control,
		handleSubmit,
		formState: { errors },
	} = useForm({
		defaultValues: {
			password: '',
			confirmPassword: '',
		},
		resolver: yupResolver(validationSchema),
	});

	return (
		<div className={styles.loginWrapper}>
			<Head>
				<title>Zes</title>
				<meta name='description' content='Generated by create next app' />
				<link rel='icon' href='/favicon.ico' />
			</Head>
			<form onSubmit={handleSubmit(onSubmit)}>
				<div className={styles.content}>
					<div className={styles.innerLogin}>
						<h1 style={{ paddingTop: '24px' }}>New Password</h1>
						<p>Please Enter New Password</p>
						<p>{errorMess}</p>
						<Controller
							name={'password'}
							control={control}
							render={({ field }) => (
								<InputGroup size='lg' className={styles.inputGroup}>
									<InputGroupText className={styles.fieldLoginText}>
										<FontAwesomeIcon icon={faLock} />
									</InputGroupText>
									<Input
										size={'lg'}
										placeholder='Password'
										type='password'
										width={500}
										className={styles.textField}
										{...field}
									/>
									{errors['password'] && (
										<p className={styles.errorMessage}>
											{errors['password'].message}
										</p>
									)}
								</InputGroup>
							)}
						/>
						<br />
						<Controller
							name={'confirmPassword'}
							control={control}
							render={({ field }) => (
								<InputGroup size='lg' className={styles.inputGroup}>
									<InputGroupText className={styles.passwordFieldLoginText}>
										<FontAwesomeIcon icon={faLock} />
									</InputGroupText>
									<Input
										size={'lg'}
										type='password'
										placeholder='Confirm Password'
										width={500}
										{...field}
										className={styles.textField}
									/>
									{errors['confirmPassword'] && (
										<p className={styles.errorMessage}>
											{errors['confirmPassword'].message}
										</p>
									)}
								</InputGroup>
							)}
						/>
						<br />
						<br />
						<br />
						<button className={styles.loginButton} type='submit'>
							Submit
						</button>
						<br />
						<br />

						<div className={styles.createAccLink}>
							<p>
								New Customer{' '}
								<span onClick={handleRegister}>Create Account</span>
							</p>
						</div>
					</div>
				</div>
			</form>
		</div>
	);
}
