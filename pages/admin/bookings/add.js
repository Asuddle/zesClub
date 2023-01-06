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
		type: 'autocomplete',
		name: 'name',
		label: 'Event',
		url: '/api/events',
	},
	{
		type: 'autocomplete',
		name: 'price',
		label: 'Customer',
		url: '/api/auth',
	},
];
export default function AddEvent({
	defaultValues = {},
	method = 'post',
	title = 'Add Booking',
}) {
	const router = useRouter();
	const [fileInput, setFileInput] = useState('');

	const validationSchema = yup.object({});

	const onSubmit = (data) => {};

	const {
		control,
		handleSubmit,
		setValue,
		formState: { errors },
	} = useForm({
		defaultValues: defaultValues,
		resolver: yupResolver(validationSchema),
	});

	return (
		<BaseCard title={title}>
			<div style={{ minHeight: '600px' }}>
				<form onSubmit={handleSubmit(onSubmit)}>
					<Row className='row g-3'>
						{formField5.map((item) => (
							<FieldCreator
								control={control}
								key={item.label}
								item={item}
								col={12}
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
			</div>
		</BaseCard>
	);
}
