import 'bootstrap/dist/css/bootstrap.min.css';

import * as yup from 'yup';

import { Card, Row } from 'reactstrap';

import CardWrapper from '../Register/CardWrapper';
import ContainerComponent from '../container';
import FieldCreator from '../Register/fieldCreator';
import HeadingComponent from '../Heading';
import homeStyles from '../../styles/Home.module.scss';
import styles from '../../styles/Register.module.scss';
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
	{ type: 'text', name: 'email', label: 'Email' },
	{ type: 'text', name: 'firstName', label: 'First Name' },
	{ type: 'text', name: 'lastName', label: 'Last Name' },
	{
		type: 'select',
		options: [
			{
				value: 'Member Type',
				label: 'Member Type',
			},
			{
				value: 'Zes Beauty Club',
				label: 'Zes Beauty Club',
			},
			{
				value: 'Zes Club',
				label: 'Zes Club',
			},
			{
				value: 'Zes Events',
				label: 'Zes Events',
			},
			{
				value: 'Upcoming Events',
				label: 'Upcoming Events',
			},
			{
				value: 'Events Services',
				label: 'Events Services',
			},
		],
		name: 'enquiryType',
		label: 'Enquiry Type',
	},
	{ type: 'textarea', name: 'message', label: 'Message' },
];
export default function ContactForm() {
	const validationSchema = yup.object({
		title: yup.mixed().required(),
		firstName: yup.string().required(),
		lastName: yup.string().required(),
		email: yup.string().email().required(),
	});

	const {
		control,
		handleSubmit,
		setValue,
		formState: { errors },
	} = useForm({
		defaultValues: {},
		resolver: yupResolver(validationSchema),
	});
	const onSubmit = (data) => {
		const formData = new FormData();
	};

	return (
		<ContainerComponent>
			<Card className={styles.card}>
				<form onSubmit={handleSubmit(onSubmit)}>
					<Row className='row g-3'>
						{formField1.map((item) => (
							<FieldCreator
								key={item.label}
								item={item}
								control={control}
								errors={errors}
								col={6}
								formGroupStyle={styles.contactFormGroup}
							/>
						))}
						<div className='text-center'>
							<br />
							<button
								className={homeStyles.aboutZesButton}
								style={{ textTransform: 'uppercase' }}
								type='submit'
							>
								Submit
							</button>
						</div>
					</Row>
				</form>
			</Card>
			<br />
			<br />
		</ContainerComponent>
	);
}
