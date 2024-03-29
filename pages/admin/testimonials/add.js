import 'bootstrap/dist/css/bootstrap.min.css';

import * as yup from 'yup';

import BaseCard from '../../../components/baseCard/BaseCard';
import { Button } from '@mui/material';
import FieldCreator from '../../../components/Register/fieldCreator';
import { Row } from 'reactstrap';
import axios from 'axios';
import { putCall } from '../../../util/axios';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';

const formField5 = [
	{
		type: 'text',
		name: 'name',
		label: 'Name',
		col: 6,
	},

	{
		type: 'file',
		name: 'image',
		label: 'Image',
		col: 6,
	},
	{
		type: 'text',
		name: 'designation',
		label: 'Designation',
		col: 10,
	},
	{
		type: 'textarea',
		name: 'description',
		label: 'Description',
		col: 12,
	},
];

export default function AddTestimonial({
	defaultValues = {},
	title = 'Testimonial',
	edit = false,
	testimonialId = 0,
}) {
	const router = useRouter();
	const [fileInput, setFileInput] = useState('');
	const validationObj = {
		name: yup.string().required(),
		designation: yup.string().required(),
		description: yup.string().required(),
		image: yup.string().required(),
	};
	const validationSchema = yup.object(validationObj);
	const onSubmit = (data) => {
		const formData = new FormData();
		let result = {
			...data,
			image: fileInput,
		};

		if (typeof data.description == 'object') {
			result['description'] = JSON.stringify(data.description);
		}
		for (const key in result) {
			formData.append(key, result[key]);
		}

		const config = {
			headers: { 'content-type': 'multipart/form-data' },
		};
		if (!edit) {
			axios
				.post('/api/testimonials', formData, config)
				.then((res) => {
					router.push('/admin/testimonials');
				})
				.catch((err) => {
					console.log(err);
				});
		} else {
			putCall(`/api/testimonials?id=${testimonialId}`, formData)
				.then((res) => {
					router.push('/admin/testimonials');
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
		defaultValues: defaultValues,
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
							col={item.col}
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
