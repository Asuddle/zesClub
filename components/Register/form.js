import 'bootstrap/dist/css/bootstrap.min.css';

import * as yup from 'yup';

import { Alert, Card, Col, FormGroup, Input, Label, Row } from 'reactstrap';

import CardWrapper from './CardWrapper';
import ContainerComponent from '../container';
import FieldCreator from './fieldCreator';
import axios from 'axios';
import { countryArr } from '../countryArr';
import homeStyles from '../../styles/Home.module.scss';
import styles from '../../styles/Register.module.scss';
import { toast } from 'react-toastify';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';

export const formField1 = [
	{
		type: 'select',
		options: [
			{
				value: 'Mr',
				label: 'Mr',
			},
			{
				value: 'Mrs',
				label: 'Mrs',
			},
			{
				value: 'Ms',
				label: 'Ms',
			},
		],
		name: 'title',
		label: 'Title',
	},
	{ type: 'text', name: 'firstName', label: 'First Name' },
	{
		type: 'text',
		name: 'middleName',
		label: 'Middle Name',
		align: 'right',
	},
	{ type: 'text', name: 'lastName', label: 'Last Name' },
	{ type: 'select', options: countryArr, name: 'country', label: 'Country' },
	{
		type: 'select',
		name: 'city',
		label: 'Emirates City',
		align: 'right',
		options: [
			{
				value: 'Abu Dhabi',
				label: 'Abu Dhabi',
			},
			{
				value: 'Dubai',
				label: 'Dubai',
			},
			{
				value: 'Sharjah',
				label: 'Sharjah',
			},
			{
				value: 'Ajman',
				label: 'Ajman',
			},
			{
				value: 'Umm Al Quwain',
				label: 'Umm Al Quwain',
			},
			{
				value: 'Ras Al Khaimah',
				label: 'Ras Al Khaimah',
			},
			{
				value: 'Fujairah',
				label: 'Fujairah',
			},
		],
	},
	{
		type: 'select',
		name: 'nationality',
		label: 'Nationality',
		options: countryArr,
	},
	{
		type: 'text',
		name: 'profession',
		label: 'Profession/Member Type',
	},
	{
		type: 'text',
		name: 'emiratesID',
		subtitle: 'Must be in format 784-1234-1234567-1',
		label: 'Emirates ID #',
		align: 'right',
	},
];

export const spouseformField1 = [
	{
		type: 'select',
		options: [
			{
				value: 'Mr',
				label: 'Mr',
			},
			{
				value: 'Mrs',
				label: 'Mrs',
			},
			{
				value: 'Ms',
				label: 'Ms',
			},
		],
		name: 'spouse_title',
		label: 'Title',
	},
	{ type: 'text', name: 'spouse_firstName', label: 'First Name' },
	{
		type: 'text',
		name: 'spouse_middleName',
		label: 'Middle Name',
		align: 'right',
	},
	{ type: 'text', name: 'spouse_lastName', label: 'Last Name' },
	{
		type: 'select',
		options: countryArr,
		name: 'spouse_country',
		label: 'Country',
	},
	{
		type: 'select',
		name: 'spouse_city',
		label: 'Emirates City',
		options: [
			{
				value: 'Abu Dhabi',
				label: 'Abu Dhabi',
			},
			{
				value: 'Dubai',
				label: 'Dubai',
			},
			{
				value: 'Sharjah',
				label: 'Sharjah',
			},
			{
				value: 'Ajman',
				label: 'Ajman',
			},
			{
				value: 'Umm Al Quwain',
				label: 'Umm Al Quwain',
			},
			{
				value: 'Ras Al Khaimah',
				label: 'Ras Al Khaimah',
			},
			{
				value: 'Fujairah',
				label: 'Fujairah',
			},
		],
	},
	{
		type: 'select',
		options: countryArr,
		name: 'spouse_nationality',
		label: 'Nationality',
	},
	{
		type: 'text',
		name: 'spouse_profession',
		label: 'Profession/Member Type',
	},
	{
		type: 'text',
		name: 'spouse_emiratesID',
		label: 'Emirates ID #',
		subtitle: 'Must be in format 784-1234-1234567-1',
		align: 'right',
	},
];

export const formField2 = [
	{ type: 'text', name: 'mobile', pretext: '+971', label: 'Mobile Number' },
	{
		type: 'text',
		name: 'email',
		options: { type: 'email' },
		label: 'Email Address',
	},
	{
		type: 'text',
		name: 'password',
		options: { type: 'password' },
		label: 'Password',
	},
];

export const formField3 = [
	{
		type: 'inline-radio',
		label: 'Do you have your own business',
		name: 'haveBusiness',
	},
	{
		type: 'inline-text',
		label: 'Industry Sector (Business Type)',
		name: 'industrySector',
	},
];

export const formField4 = [
	{
		type: 'text',
		name: 'website',
		label: 'Website',
	},
	{ type: 'text', name: 'hobbies', label: 'Hobbies' },
	{
		type: 'select',
		options: [
			{
				value: 'Business and Industry',
				label: 'Business and Industry',
			},
			{
				value: 'Entertainment and leisure',
				label: 'Entertainment and leisure',
			},
			{
				value: 'Family and Relationships',
				label: 'Family and Relationships',
			},
			{
				value: 'Fitness and Wellness',
				label: 'Fitness and Wellness',
			},
			{
				value: 'Food and Drink',
				label: 'Food and Drink',
			},
			{
				value: 'Hobbies and Activities',
				label: 'Hobbies and Activities',
			},
			{
				value: 'Shopping and Fashion',
				label: 'Shopping and Fashion',
			},
			{
				value: 'Sports and Outdoors',
				label: 'Sports and Outdoors',
			},
			{
				value: 'Technology and Gadgets',
				label: 'Technology and Gadgets',
			},
			{
				value: 'Beauty and Body Care',
				label: 'Beauty and Body Care',
			},
			{
				value: 'Others',
				label: 'Others',
			},
		],
		name: 'interest',
		label: 'Interest',
	},
	{ type: 'text', name: 'height', label: 'Height' },
	{
		type: 'text',
		name: 'age',
		label: 'Age',
		options: { type: 'number' },
	},
	{
		type: 'text',
		name: 'weight',
		options: { type: 'number' },
		label: 'Weight',
	},
	{
		type: 'textarea',
		name: 'makeHappy',
		label: 'What makes you feel happy?',
	},
];

export const formField5 = [
	// { type: 'text', label: 'Emirates ID' },
	{
		type: 'file',
		name: 'profile',
		label: 'Profile Photo',
	},
	{
		type: 'file',
		name: 'emiratesIdFile',
		label: 'Emirates Id / Passport Photo',
	},
	// {
	// 	type: 'file',
	// 	name: 'passportFile',
	// 	label: 'Passport Photo',
	// },
	// { type: 'text', label: 'Weight', name: 'weight' },
	{
		type: 'textarea',
		name: 'expectations',
		label: 'What are your expextations about ZeS Club?',
	},
];

export default function RegisterForm({
	defaultValue = {},
	onCustomSubmit = false,
	tabValue = 1,
}) {
	const [zesClub, setZesClub] = useState(tabValue);
	const [fileInput, setFileInput] = useState('');
	const [passportInput, setPassportInput] = useState('');
	const [emiratesIdInput, setEmirateIdInput] = useState('');
	const [isSuccess, setIsSuccess] = useState(false);
	const [confirm1, setConfirm1] = useState(false);
	const [confirm2, setConfirm2] = useState(false);
	// const [isSubmit,setIsSubmit]
	let validationObj = {
		title: yup.mixed().required(),
		firstName: yup.string().required(),
		lastName: yup.string().required(),
		email: yup.string().email().required(),
		password: yup
			.string()
			.required()
			.min(8, 'Password should be at least 8 characters')
			.matches(
				/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
				'Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character',
			),
		country: yup.mixed().required(),
		city: yup.mixed().required(),
		nationality: yup.mixed().required(),
		// profession: yup.mixed().required(),
		// ^784-?[0-9]{4}-?[0-9]{7}-?[0-9]{1}$
		emiratesID: yup
			.string()
			.required()
			.matches(
				/^784-?[0-9]{4}-?[0-9]{7}-?[0-9]{1}$/,
				'Must be in emirates id format',
			),
		// passportFile: yup.string().required(),
		emiratesIdFile: yup.string().required(),
		mobile: yup
			.string()
			.required()
			.matches(/^[0-9]*$/, 'Must be a valid Phone Number'),
		//
		// profile: yup.string().required(),
		// website: yup.mixed().required(),
		hobbies: yup.string().required(),
		interest: yup.mixed().required(),
		expectations: yup.string().required(),
	};
	if (zesClub === 2) {
		validationObj = {
			...validationObj,
			...{
				spouse_title: yup.mixed().required(),
				spouse_firstName: yup.string().required(),
				spouse_lastName: yup.string().required(),
				spouse_country: yup.mixed().required(),
				spouse_city: yup.mixed().required(),
				spouse_emiratesID: yup
					.string()
					.required()
					.matches(
						/^784-?[0-9]{4}-?[0-9]{7}-?[0-9]{1}$/,
						'Must be in emirates id format',
					),
				spouse_nationality: yup.mixed().required(),
				// spouse_
			},
		};
	}

	const validationSchema = yup.object(validationObj);
	// console.log('defaultVal', formField5);
	const {
		control,
		handleSubmit,
		setValue,
		formState: { errors },
	} = useForm({
		defaultValues: defaultValue,
		resolver: yupResolver(validationSchema),
	});
	console.log(errors);
	const handleTab = (val) => {
		setZesClub(val);
	};
	const onSubmit = (data) => {
		if (onCustomSubmit) {
			onCustomSubmit(data, fileInput, passportInput, emiratesIdInput);
		} else {
			const formData = new FormData();

			let result = {
				...data,
				...{
					title: data.title.value,
					interest: data.interest.value,
					city: data.city.value,
					haveOwnBusiness: 0,
					photo: fileInput || '',
					website: data.website || '',
					haveBusiness: data.haveBusiness || '',
					// passportFile: passportInput,
					emiratesIdFile: emiratesIdInput,
					country: data.country.value,
					profilePhoto: data.profilePhoto || '',
					nationality: data.nationality.value,
					makeHappy: data.makeHappy || '',
				},
			};

			if (zesClub === 2) {
				result['spouse_nationality'] = data.spouse_nationality.value;
				result['spouse_country'] = data.spouse_country.value;
				result['spouse_title'] = data.spouse_title.value;
				result['spouse_city'] = data.spouse_city.value;
			}

			for (const key in result) {
				formData.append(key, result[key]);
			}

			const config = {
				headers: { 'content-type': 'multipart/form-data' },
			};

			// console.log('formData', formData);
			axios
				.post('/api/auth', formData, config)
				.then((res) => {
					console.log(res.status === 201);
					if (res.status === 201) {
						setIsSuccess(true);
						// successCallback();
					} else {
						toast.error('Something went wrong', { theme: 'colored' });
					}
				})
				.catch((err) => {
					console.log(err);
				});
		}
	};
	return (
		<ContainerComponent>
			{isSuccess ? (
				<div>
					<Alert color='success'>
						Congratulation ! you have successfully registered in ZesClub , the
						admin will approve you shortly{' '}
					</Alert>
					<br />
					<br />
				</div>
			) : (
				<form onSubmit={handleSubmit(onSubmit)}>
					<CardWrapper>
						<Row className='row g-3'>
							<Col
								md={6}
								className={zesClub == 1 ? styles.tabLeftActive : styles.tabLeft}
								onClick={() => handleTab(1)}
							>
								ZeS Beauty Club (Ladies Only)
							</Col>
							<Col
								md={6}
								className={
									zesClub == 2 ? styles.tabRightActive : styles.tabRight
								}
								onClick={() => handleTab(2)}
							>
								ZeS Club (Couples Only)
							</Col>
							{formField1.map((item) => (
								<FieldCreator
									key={item.label}
									item={item}
									control={control}
									errors={errors}
								/>
							))}
							<br />
							<br />
							<br />
						</Row>
					</CardWrapper>
					<br />
					<br />
					{zesClub == 2 && (
						<Card className={styles.card}>
							<Row className='row g-3'>
								<h4>Spouse Details</h4>
								{spouseformField1.map((item) => (
									<FieldCreator
										control={control}
										key={item.label}
										item={item}
										errors={errors}
									/>
								))}
								<br />
								<br />
								<br />
							</Row>
						</Card>
					)}
					<br />
					<br />
					<Card className={styles.card}>
						<Row className='row g-3'>
							{formField2.map((item) => (
								<FieldCreator
									control={control}
									key={item.label}
									item={item}
									errors={errors}
								/>
							))}
							<br />
							<br />
							<br />
						</Row>
					</Card>
					<br />
					<br />
					<Card className={styles.card}>
						<Row className='row g-3'>
							{formField3.map((item) => (
								<FieldCreator
									control={control}
									key={item.label}
									item={item}
									errors={errors}
								/>
							))}
						</Row>
					</Card>
					<br />
					<br />
					<Card className={styles.card}>
						<Row>
							{formField4.map((item) => (
								<FieldCreator
									control={control}
									key={item.label}
									item={item}
									errors={errors}
								/>
							))}
						</Row>
					</Card>
					<br />
					<br />
					<Card className={styles.card}>
						<Row>
							{formField5.map((item) => (
								<FieldCreator
									control={control}
									key={item.label}
									item={item}
									errors={errors}
									setValue={setValue}
									setFileInput={
										item.name === 'emiratesIdFile'
											? setEmirateIdInput
											: setFileInput
									}
									fileInput={
										item.name === 'emiratesIdFile' ? emiratesIdInput : fileInput
									}
								/>
							))}
						</Row>
					</Card>
					<br />
					<br />
					<FormGroup check>
						<Label check className={styles.inputLabel}>
							<Input
								type='checkbox'
								onChange={(e) => setConfirm2(e.target.checked)}
							/>{' '}
							I acknowledge that I have read and understand the membership
							benefits as well as the mission and objective of ZeS Club
						</Label>
					</FormGroup>
					<br />
					<FormGroup check>
						<Label check className={styles.inputLabel}>
							<Input
								type='checkbox'
								onChange={(e) => setConfirm1(e.target.checked)}
							/>{' '}
							I hereby confirmed that all information, we provided are genuine
							and verfied
						</Label>
					</FormGroup>
					<br />
					<br />
					<button
						className={homeStyles.aboutZesButton}
						style={{ textTransform: 'uppercase' }}
						type='submit'
						disabled={!(confirm2 && confirm1)}
					>
						Submit
					</button>

					<br />
				</form>
			)}
		</ContainerComponent>
	);
}
export async function getServerSideProps({
	params,
	req,
	res,
	query,
	preview,
	previewData,
	resolvedUrl,
	locale,
	locales,
	defaultLocale,
}) {
	console.log('Logging : ' + res);
}
