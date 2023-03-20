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
		name: 'title',
		label: 'Title',
		col: 6,
	},
	{
		type: 'file',
		name: 'image',
		label: 'Image',
		col: 6,
	},
	{
		type: 'wysiwyg',
		name: 'description',
		label: 'Description',
		col: 8,
	},
];

export default function AddService({
	defaultValues = {},
	title = 'Service',
	edit = false,
	serviceId = 0,
}) {
	const router = useRouter();
	const [fileInput, setFileInput] = useState('');
	const validationObj = {
		title: yup.string().required(),
		// description: yup.string().required(),
		image: yup.string().required(),
	};
	const validationSchema = yup.object(validationObj);
	const onSubmit = (data) => {
		const formData = new FormData();
		let result = {
			...data,
			...{
				image: fileInput,
			},
		};
		if (typeof data.description == 'object') {
			data['description'] = JSON.stringify(data.description);
			if (JSON.stringify(data.description).includes('_immutable')) {
				data['description'] = defaultValues.defDes;
			}
		}

		for (const key in data) {
			formData.append(key, data[key]);
		}
		formData.append('image', fileInput);

		const config = {
			headers: { 'content-type': 'multipart/form-data' },
		};
		if (!edit) {
			axios
				.post('/api/services', formData, config)
				.then((res) => {
					router.push('/admin/services');
				})
				.catch((err) => {
					console.log(err);
				});
		} else {
			putCall(`/api/services?id=${serviceId}`, formData)
				.then((res) => {
					router.push('/admin/services');
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
