import * as yup from 'yup';

import { Button, Col, Row } from 'reactstrap';
import { useEffect, useState } from 'react';

import FieldCreator from '../Register/fieldCreator';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Image from 'next/image';
import axios from 'axios';
import { countryArr } from '../countryArr';
import { faPencil } from '@fortawesome/free-solid-svg-icons';
import { putCall } from '../../util/axios';
import styles from '../../styles/user.module.scss';
import { toast } from 'react-toastify';
import { useForm } from 'react-hook-form';
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
		type: 'text',
		name: 'nationality',
		label: 'Nationality',
	},
	{
		type: 'text',
		name: 'profession',
		label: 'Profession/Member Type',
	},
	{
		type: 'text',
		name: 'emiratesID',
		label: 'Emirates ID',
		align: 'right',
	},
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
		type: 'file',
		name: 'profile',
		label: 'Profile Photo',
	},
];
export default function UserProfileComponent({ defaultValue = {} }) {
	const [data, setData] = useState({});
	const [fileInput, setFileInput] = useState('');
	const onSubmit = (data) => {
		const formData = new FormData();
		let result = {
			...data,
			...{
				title: data.title.value,
				interest: data.interest.value,
				city: data.city.value,
				haveOwnBusiness: 0,
				photo: fileInput,
				// photo: file,
				// passportFile: passportInput,
				// emiratesIdFile: emiratesIdInput,
				country: data.country.value,
				nationality: data.nationality.value,
				spouse_nationality: data.spouse_nationality?.value || '',
				spouse_title: data.spouse_title?.value || '',
				spouse_city: data.spouse_city?.value || '',
				spouse_country: data.spouse_country?.value || '',
			},
		};

		const config = {
			headers: { 'content-type': 'multipart/form-data' },
		};
		for (const key in result) {
			formData.append(key, result[key]);
		}
		// axios
		// 	.put(`/api/users/${data.id}`, result, config)
		putCall(`/api/users/${data.user_id}`, result)
			.then((res) => {
				toast.success('Updated Successfully');
				// router.push('/admin/user');
				// setData(res.dat	a.data[0]);
			})
			.catch((err) => {
				console.error(err);
			});
	};

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
		country: yup.mixed().required(),
		city: yup.mixed().required(),
		nationality: yup.string().required(),
		// profession: yup.mixed().required(),
		emiratesID: yup.string().required(),
		mobile: yup.string().required(),
		// website: yup.mixed().required(),
		hobbies: yup.string().required(),
		interest: yup.mixed().required(),
		expectations: yup.string().required(),
	});

	const {
		control,
		handleSubmit,
		setValue,
		formState: { errors },
		reset,
	} = useForm({
		defaultValues: data,
		resolver: yupResolver(validationSchema),
	});
	useEffect(() => {
		let data = JSON.parse(localStorage.getItem('userData'));
		axios.get(`/api/users/${data.id}`).then((res) => {
			setData(res.data.data[0]);
			const tempData = res.data.data[0];
			tempData.country = { value: tempData.country, label: tempData.country };
			tempData.title = { value: tempData.title, label: tempData.title };
			tempData.city = { value: tempData.city, label: tempData.city };
			tempData.interest = {
				value: tempData.interest,
				label: tempData.interest,
			};
			reset(tempData);
		});
	}, []);
	// console.log(data);
	// const [title,firstName,middleName,lastName:'']
	return (
		<div className={styles.userProfileWrapper}>
			<h1 className={styles.heading}>Profile</h1>
			<br />
			<br />
			<form onSubmit={handleSubmit(onSubmit)}>
				<Row>
					<Col md={2}>
						<Image
							className={styles.userImage}
							src={`/${data.photo}`}
							width={130}
							height={130}
						/>
					</Col>
					<Col md={6}>
						<p className={styles.userName}>
							{data.firstName} {data.middleName} {data.lastName}
						</p>
						<p className={styles.userID}>{data.user_id}</p>
						<p className={styles.verifiedAccount}>Verified account</p>
					</Col>
					<Col md={4}>
						<div className={styles.editPhone}>
							<div>
								<p className={styles.verifiedMobileLabel}>
									Verified mobile number
								</p>
								<p className={styles.phone}>{data.mobile}</p>
							</div>
							<FontAwesomeIcon size='2x' color='#fda700' icon={faPencil} />
						</div>
						<br />
						<Button type='submit' style={{ float: 'right', marginTop: '12px' }}>
							Submit
						</Button>
					</Col>
				</Row>
				<br />

				<Row className='row g-3'>
					{formField1.map((item) => (
						<FieldCreator
							key={item.label}
							item={item}
							control={control}
							errors={errors}
							fileInput={fileInput}
							setFileInput={setFileInput}
						/>
					))}
				</Row>
			</form>
		</div>
	);
}
