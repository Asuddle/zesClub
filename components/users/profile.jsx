import * as yup from 'yup';

import { Col, Row } from 'reactstrap';

import FieldCreator from '../Register/fieldCreator';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Image from 'next/image';
import { countryArr } from '../countryArr';
import { faPencil } from '@fortawesome/free-solid-svg-icons';
import styles from '../../styles/user.module.scss';
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
		name: 'profilePhoto',
	},
];
export default function UserProfileComponent({ defaultValue = {} }) {
	const onSubmit = () => {};

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
	} = useForm({
		defaultValues: defaultValue,
		resolver: yupResolver(validationSchema),
	});
	return (
		<div className={styles.userProfileWrapper}>
			<h1 className={styles.heading}>Profile</h1>
			<br />
			<br />
			<Row>
				<Col md={2}>
					<Image src='/user.png' width={130} height={130} />
				</Col>
				<Col md={6}>
					<p className={styles.userName}>John Doe Jane Doe</p>
					<p className={styles.userID}>USER - ID NUMBER</p>
					<p className={styles.verifiedAccount}>Verified account</p>
				</Col>
				<Col md={4}>
					<div className={styles.editPhone}>
						<div>
							<p className={styles.verifiedMobileLabel}>
								Verified mobile number
							</p>
							<p className={styles.phone}>+971509506546</p>
						</div>
						<FontAwesomeIcon size='2x' color='#fda700' icon={faPencil} />
					</div>
				</Col>
			</Row>
			<br />
			<form onSubmit={handleSubmit(onSubmit)}>
				<Row className='row g-3'>
					{formField1.map((item) => (
						<FieldCreator
							key={item.label}
							item={item}
							control={control}
							errors={errors}
						/>
					))}
				</Row>
			</form>
		</div>
	);
}
