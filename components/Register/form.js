import 'bootstrap/dist/css/bootstrap.min.css';

import * as yup from 'yup';

import { Alert, Card, Col, FormGroup, Input, Label, Row } from 'reactstrap';

import CardWrapper from './CardWrapper';
import ContainerComponent from '../container';
import FieldCreator from './fieldCreator';
import axios from 'axios';
import homeStyles from '../../styles/Home.module.scss';
import styles from '../../styles/Register.module.scss';
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
	{ type: 'text', name: 'country', label: 'Country' },
	{
		type: 'text',
		name: 'city',
		label: 'Emirates City',
		align: 'right',
	},
	{
		type: 'text',
		name: 'nationality',
		label: 'Nationality',
	},
	{
		type: 'select',
		name: 'profession',
		label: 'Profession/Member Type',
		options: [
			{
				value: 'Businessman',
				label: 'Businessman',
			},
			{
				value: 'IT Expert',
				label: 'IT Expert',
			},
			{
				value: 'Others',
				label: 'Others',
			},
		],
	},
	{
		type: 'text',
		name: 'emiratesID',
		label: 'Emirates ID',
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
	{ type: 'text', name: 'spouse_country', label: 'Country' },
	{
		type: 'text',
		name: 'spouse_city',
		label: 'Emirates City',
		align: 'right',
	},
	{
		type: 'text',
		name: 'spouse_nationality',
		label: 'Nationality',
	},
	{
		type: 'select',
		name: 'spouse_profession',
		label: 'Profession/Member Type',
		options: [
			{
				value: 'Businessman',
				label: 'Businessman',
			},
			{
				value: 'IT Expert',
				label: 'IT Expert',
			},
			{
				value: 'Others',
				label: 'Others',
			},
		],
	},
	{
		type: 'text',
		name: 'spouse_emiratesId',
		label: 'Emirates ID',
		align: 'right',
	},
];

export const formField2 = [
	{ type: 'text', name: 'mobile', label: 'Mobile Number', name: 'mobile' },
	{
		type: 'text',
		name: 'email',
		options: { type: 'email' },
		label: 'Email Address',
		name: 'email',
	},
	{
		type: 'text',
		name: 'password',
		options: { type: 'password' },
		label: 'Password',
		name: 'password',
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
		label: 'Industry Sector (If yes)',
		name: 'industrySector',
	},
];

export const formField4 = [
	{
		type: 'select',
		options: [
			{
				value: 'abc',
				label: 'abc',
			},
			{
				value: 'def',
				label: 'def',
			},
			{
				value: 'ghi',
				label: 'ghi',
			},
		],
		name: 'website',
		label: 'Website (if any)',
		name: 'website',
	},
	{ type: 'text', name: 'hobbies', label: 'Hobbies', name: 'hobbies' },
	{
		type: 'select',
		options: [
			{
				value: 'Gardening',
				label: 'gardening',
			},
			{
				value: 'Sports',
				label: 'Sports',
			},
			{
				value: 'Gaming',
				label: 'Gaming',
			},
		],
		name: 'interest',
		label: 'Interest',
		name: 'interest',
	},
	{ type: 'text', name: 'height', label: 'Height', name: 'height' },
	{
		type: 'text',
		name: 'age',
		label: 'Age',
		options: { type: 'number' },
		name: 'age',
	},
	{
		type: 'text',
		name: 'weight',
		options: { type: 'number' },
		label: 'Weight',
		name: 'weight',
	},
	{
		type: 'textarea',
		name: 'makesHappy',
		label: 'What makes you feel happy?',
		name: 'feelHappy',
	},
];

export const formField5 = [
	// { type: 'text', label: 'Emirates ID' },
	{
		type: 'file',
		name: 'profile',
		label: 'Profile Photo',
		name: 'profilePhoto',
	},
	// { type: 'text', label: 'Weight', name: 'weight' },
	{
		type: 'textarea',
		name: 'expectations',
		label: 'What are your expextations about ZeS Club?',
	},
];

export default function RegisterForm({ defaultValue = {} }) {
	const [zesClub, setZesClub] = useState(1);
	const [fileInput, setFileInput] = useState('');
	const [isSuccess, setIsSuccess] = useState(false);
	const [confirm1, setConfirm1] = useState(false);
	const [confirm2, setConfirm2] = useState(false);

	// const [isSubmit,setIsSubmit]
	const validationSchema = yup.object({
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
		country: yup.string().required(),
		city: yup.string().required(),
		nationality: yup.string().required(),
		profession: yup.mixed().required(),
		emiratesID: yup.string().required(),
		mobile: yup.string().required(),
		website: yup.mixed().required(),
		hobbies: yup.string().required(),
		interest: yup.mixed().required(),
		expectations: yup.string().required(),
	});
	// console.log('defaultVal', defaultValue);
	const {
		control,
		handleSubmit,
		setValue,
		formState: { errors },
	} = useForm({
		defaultValues: defaultValue,
		resolver: yupResolver(validationSchema),
	});

	const handleTab = (val) => {
		setZesClub(val);
	};
	const convertToBase64 = (file) => {
		const reader = new FileReader();
		reader.onloadend = () => {
			console.log(reader.result.toString());
		};
		reader.readAsDataURL(file);
	};
	const onSubmit = (data) => {
		const formData = new FormData();

		let result = {
			...data,
			...{
				title: data.title.value,
				interest: data.interest.value,
				website: data.website.value,
				profession: data.profession.value,
				haveOwnBusiness: 0,
				profilePhoto: fileInput,
			},
		};
		for (const key in result) {
			formData.append(key, result[key]);
		}
		const config = {
			headers: { 'content-type': 'multipart/form-data' },
		};
		axios
			.post('/api/auth', formData, config)
			.then((res) => {
				setIsSuccess(true);
			})
			.catch((err) => {
				console.log(err);
			});
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
								ZeS Beauty Club
							</Col>
							<Col
								md={6}
								className={
									zesClub == 2 ? styles.tabRightActive : styles.tabRight
								}
								onClick={() => handleTab(2)}
							>
								ZeS Club
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
									setFileInput={setFileInput}
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
