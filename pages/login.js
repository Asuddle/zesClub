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

import { AuthContext } from '../src/context/auth-context';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Head from 'next/head';
import axios from 'axios';
import styles from '../styles/login.module.scss';
import { useRouter } from 'next/router';
import { yupResolver } from '@hookform/resolvers/yup';

export default function LoginPage() {
	const authContext = useContext(AuthContext);
	const router = useRouter();
	const [errorMess, setErrorMess] = useState('');
	const handleRegister = () => {
		router.push('/register');
	};
	const handleForgotPassword = () => {
		router.push('/forgot-password');
	};

	const validationSchema = yup.object({
		email: yup.string().email().required('Email is a required field'),
		password: yup
			.string()
			.required('Password is a required field')
			.min(8, 'Password should be at least 8 characters'),
	});
	console.log(authContext);
	const onSubmit = (data) => {
		axios
			.post('/api/auth/login', data)
			.then((res) => {
				if (res.data.err) {
					setErrorMess(res.data.err);
				} else {
					console.log(authContext, res.data);
					authContext.setAuthState({
						token: res.data.token,
						role: res.data.role,
					});
					axios.defaults.headers.common = {
						Authorization: res.data.token,
					};

					setErrorMess('');
					localStorage.setItem('userData', JSON.stringify(res.data));
					if (res.data.role === 'admin') {
						router.push('/admin');
					} else {
						router.push('/user/profile');
					}
				}
			})
			.catch((err) => {
				console.log(err);
			});
	};

	const {
		control,
		handleSubmit,
		formState: { errors },
	} = useForm({
		defaultValues: {
			email: '',
			password: '',
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
						<p className={styles.signInHeading}>Sign In</p>
						<p>{errorMess}</p>
						<Controller
							name={'email'}
							control={control}
							render={({ field }) => (
								<InputGroup size='lg' className={styles.inputGroup}>
									<InputGroupText className={styles.fieldLoginText}>
										<FontAwesomeIcon icon={faUser} />
									</InputGroupText>
									<Input
										size={'lg'}
										placeholder='Email'
										width={500}
										className={styles.textField}
										{...field}
									/>
									{errors['email'] && (
										<p className={styles.errorMessage}>
											{errors['email'].message}
										</p>
									)}
								</InputGroup>
							)}
						/>
						<br />
						<Controller
							name={'password'}
							control={control}
							render={({ field }) => (
								<InputGroup size='lg' className={styles.inputGroup}>
									<InputGroupText className={styles.passwordFieldLoginText}>
										<FontAwesomeIcon icon={faLock} />
									</InputGroupText>
									<Input
										size={'lg'}
										type='password'
										placeholder='***********'
										width={500}
										{...field}
										className={styles.textField}
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
						<div className={styles.linksWrapper}>
							<div style={{ float: 'left' }}>
								<p>Remember me</p>
							</div>
							<div>
								<p onClick={handleForgotPassword}>
									<i>Forgot Password?</i>
								</p>
							</div>
						</div>
						<br />
						<br />
						<button className={styles.loginButton} type='submit'>
							LOGIN
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
