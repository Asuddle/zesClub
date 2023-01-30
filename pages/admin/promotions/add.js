import 'bootstrap/dist/css/bootstrap.min.css';

import * as yup from 'yup';

import { Button, Row } from 'reactstrap';

import BaseCard from '../../../components/baseCard/BaseCard';
import FieldCreator from '../../../components/Register/fieldCreator';
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
		col: 12,
	},
	{
		type: 'file',
		name: 'image',
		label: 'Image',
		col: 12,
	},
];
export default function AddPromotions({
	customSubmit = false,
	title = 'Add Promotions',
	defaultValues = {},
}) {
	const [fileInput, setFileInput] = useState('');
	const router = useRouter();
	const validationObj = {
		name: yup.string().required(),
		image: yup.string().required(),
	};
	const validationSchema = yup.object(validationObj);

	const {
		control,
		handleSubmit,
		setValue,
		formState: { errors },
	} = useForm({
		defaultValues,
		resolver: yupResolver(validationSchema),
	});

	const onSubmit = (val) => {
		if (customSubmit) {
			customSubmit(val, fileInput);
		} else {
			const formData = new FormData();
			let result = {
				...val,
				image: fileInput,
			};
			for (const key in result) {
				formData.append(key, result[key]);
			}
			const config = {
				headers: { 'content-type': 'multipart/form-data' },
			};
			axios
				.post('/api/promotions', formData, config)
				.then((res) => {
					console.log(res);
					if (res.status == 201) {
						router.push('/admin/promotions');
					}
				})
				.catch((err) => {
					console.log(err);
				});
		}
	};

	return (
		<BaseCard title={title}>
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
		</BaseCard>
	);
}
