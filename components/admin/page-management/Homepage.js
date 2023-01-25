import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import * as yup from 'yup';

import { Button, FormGroup, Input, Label, Row } from 'reactstrap';
import { Controller, useForm } from 'react-hook-form';

import { Typography } from '@mui/material';
import axios from 'axios';
import { toast } from 'react-toastify';
import { yupResolver } from '@hookform/resolvers/yup';

export const onPageSubmit = (data) => {
	const formData = new FormData();
	for (const key in data) {
		formData.append(key, data[key]);
	}
	const config = {
		headers: { 'content-type': 'multipart/form-data' },
	};
	axios
		.put('/api/pages', formData, config)
		.then((res) => {
			console.log(res.data);
			toast.success('Saved Successfully!', { theme: 'colored' });
		})
		.catch((err) => {
			console.log(err);
			toast.error('Something went wrong!', { theme: 'colored' });
		});
};
export default function HomePageForm({ defaultValues = {} }) {
	const validationSchema = yup.object({});
	const {
		control,
		handleSubmit,
		setValue,
		formState: { errors },
	} = useForm({
		defaultValues,
		resolver: yupResolver(validationSchema),
	});

	return (
		<div>
			<Typography variant='h4'>Event Management</Typography>
			<br />
			<form onSubmit={handleSubmit(onPageSubmit)}>
				<Row className='row g-3'>
					<FormGroup style={{ width: '100%' }}>
						<Label for='exampleText'>Home (Event Management)</Label>
						<Controller
							name={'home_event_management'}
							control={control}
							render={({ field }) => (
								<Input
									type='textarea'
									{...field}
									id='exampleText'
									style={{ width: '550px', height: '220px' }}
								/>
							)}
						/>
					</FormGroup>
				</Row>

				<Button color='success' variant='contained' style={{ float: 'right' }}>
					Save
				</Button>

				{/* <Button
					color='secondary'
					variant='contained'
					style={{ float: 'right', marginRight: '8px' }}
				>
					Reset
				</Button> */}
			</form>
		</div>
	);
}
