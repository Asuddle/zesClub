import 'bootstrap/dist/css/bootstrap.min.css';

import * as yup from 'yup';

import BaseCard from '../../../components/baseCard/BaseCard';
import { Button } from '@mui/material';
import FieldCreator from '../../../components/Register/fieldCreator';
import { Row } from 'reactstrap';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';

const formField5 = [
	{
		type: 'text',
		name: 'name',
		label: 'Name',
	},
	{
		type: 'text',
		name: 'price',
		label: 'Price (AED)',
		options: { type: 'number' },
	},
	{
		type: 'text',
		name: 'date',
		label: 'Event Date',
		options: { type: 'date' },
	},
	{
		type: 'text',
		name: 'venue',
		label: 'Venue',
	},
	{
		type: 'select',
		name: 'audience',
		label: 'Audience',
		options: [
			{
				value: 'Male',
				label: 'Male',
			},
			{
				value: 'Female',
				label: 'Female',
			},
			{
				value: 'All',
				label: 'Male and Female',
			},
		],
	},
	{
		type: 'file',
		name: 'image',
		label: 'Image',
	},
	{
		type: 'textarea',
		name: 'description',
		label: 'Description',
	},
];
export default function AddEvent({
	defaultValues = {},
	method = 'post',
	title = 'Add Event',
}) {
	const router = useRouter();
	const [fileInput, setFileInput] = useState('');
	const validationObj = {
		name: yup.string().required(),
		description: yup.string().required(),
		price: yup.string().required(),
		audience: yup.mixed().required(),
		venue: yup.string().required(),
		date: yup.string().required(),
		image: yup.string().required(),
	};
	if (method == 'put') {
		delete validationObj['image'];
	}
	const validationSchema = yup.object(validationObj);

	const onSubmit = (data) => {
		const formData = new FormData();

		let result = {
			...data,
			...{
				audience: data.audience.value,
				image: fileInput,
			},
		};
		for (const key in result) {
			formData.append(key, result[key]);
		}
		const config = {
			headers: { 'content-type': 'multipart/form-data' },
		};
		if (method == 'post') {
			axios
				.post('/api/events', formData, config)
				.then((res) => {
					router.push('/admin/events');
				})
				.catch((err) => {
					console.log(err);
				});
		} else {
			axios
				.put(`/api/events?id=${router.query.id}`, formData, config)
				.then((res) => {
					router.push('/admin/events');
				})
				.catch((err) => {
					console.log(err);
				});
		}
	};

	const {
		control,
		handleSubmit,
		setValue,
		formState: { errors },
	} = useForm({
		defaultValues: defaultValues
			? {
					...defaultValues,
					...{
						audience: {
							value: defaultValues.audience,
							label: defaultValues.audience,
						},
					},
			  }
			: {},
		resolver: yupResolver(validationSchema),
	});

	return (
		<BaseCard title={title}>
			<form onSubmit={handleSubmit(onSubmit)}>
				<Row className='row g-3'>
					{formField5.map((item) => (
						<FieldCreator
							control={control}
							key={item.label}
							item={item}
							col={6}
							errors={errors}
							setFileInput={setFileInput}
							fileInput={fileInput}
						/>
					))}
				</Row>
				<div className='text-center'>
					<Button
						style={{ width: '200px' }}
						variant='contained'
						color='success'
						type='submit'
						size='large'
					>
						Submit
					</Button>
				</div>
			</form>
		</BaseCard>
	);
}
