import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import * as yup from 'yup';

import { Button, FormGroup, Input, Label, Row } from 'reactstrap';
import { Controller, useForm } from 'react-hook-form';

import { Typography } from '@mui/material';
import axios from 'axios';
import { onPageSubmit } from './Homepage';
import { yupResolver } from '@hookform/resolvers/yup';

export default function AboutUsForm({ defaultValues = {} }) {
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
	console.log('defaultValues noww', defaultValues);

	return (
		<div>
			<Typography variant='h4'>About Page</Typography>
			<br />
			<form onSubmit={handleSubmit(onPageSubmit)}>
				<Row className='row g-3'>
					<FormGroup style={{ width: '100%' }}>
						<Label for='exampleText'>About (Who we are)</Label>
						<Controller
							name={'about_whoweare'}
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
				<Row className='row g-3'>
					<FormGroup style={{ width: '100%' }}>
						<Label for='exampleText'>About (Zes Beauty)</Label>
						<Controller
							name={'about_zesbeauty'}
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
				<Row className='row g-3'>
					<FormGroup style={{ width: '100%' }}>
						<Label for='exampleText'>About (Zes Club)</Label>
						<Controller
							name={'about_zesclub'}
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
				<Row className='row g-3'>
					<FormGroup style={{ width: '100%' }}>
						<Label for='exampleText'>About (Zes Events)</Label>
						<Controller
							name={'about_zesevents'}
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
				<Row className='row g-3'>
					<FormGroup style={{ width: '100%' }}>
						<Label for='exampleText'>About (Zes Founder)</Label>
						<Controller
							name={'about_zesfounder'}
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
