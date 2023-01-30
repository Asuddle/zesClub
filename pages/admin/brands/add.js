import 'bootstrap/dist/css/bootstrap.min.css';

import * as yup from 'yup';

import BaseCard from '../../../components/baseCard/BaseCard';
import { Button } from '@mui/material';
import FieldCreator from '../../../components/Register/fieldCreator';
import { Row } from 'reactstrap';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';

const formField5 = [
	{
		type: 'text',
		name: 'name',
		label: 'Name',
		col: 12,
	},
	{
		type: 'file',
		name: 'image',
		label: 'Image',
		col: 12,
	},
	{
		type: 'autocomplete',
		name: 'category',
		label: 'Category',
		url: '/api/promotions',
		col: 12,
	},
];
export default function AddBrands({
	defaultValues = {},
	method = 'post',
	title = 'Add Brand',
}) {
	const router = useRouter();
	const [fileInput, setFileInput] = useState('');

	const validationSchema = yup.object({
		name: yup.string().required(),
		image: yup.string().required(),
		category: yup.mixed().required(),
	});

	const onSubmit = (data) => {
		console.log(data, fileInput);
		const formData = new FormData();
		let result = {
			...data,
			...{
				category_id: data.category.value,
				image: fileInput,
			},
		};
		for (const key in result) {
			formData.append(key, result[key]);
		}
		const config = {
			headers: { 'content-type': 'multipart/form-data' },
		};
		axios
			.post(`/api/brands`, formData, config)
			.then((res) => {
				console.log(res.data);
				if (res.data.success) {
					router.push('/admin/brands');
				} else {
					toast.error('Something went wrong');
				}
			})
			.catch((err) => {
				console.log(err);
			});
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
			<div style={{ minHeight: '600px' }}>
				<form onSubmit={handleSubmit(onSubmit)}>
					<Row className='row g-3'>
						{formField5.map((item) => (
							<FieldCreator
								control={control}
								key={item.label}
								item={item}
								col={5}
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
