import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import * as yup from 'yup';

import { Button, FormGroup, Input, Label, Row } from 'reactstrap';
import { Controller, useForm } from 'react-hook-form';

import { Typography } from '@mui/material';
import axios from 'axios';
import { onPageSubmit } from './Homepage';
import { yupResolver } from '@hookform/resolvers/yup';

export default function WhyZesForm({ defaultValues = {} }) {
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

	const handleReset = () => {
		// setValue();
	};

	return (
		<div>
			<Typography variant='h4'>Why Zes Page</Typography>
			<br />
			<form onSubmit={handleSubmit(onPageSubmit)}>
				<Row className='row g-3'>
					<FormGroup style={{ width: '100%' }}>
						<Label for='exampleText'>Why Zes (Life with Zes)</Label>
						<Controller
							name={'whyzes_lifewithzes'}
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
						<Label for='exampleText'>Why Zes (Life without Zes)</Label>
						<Controller
							name={'whyzes_lifewithoutzes'}
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
						<Label for='exampleText'>
							Why Zes (Event Management Solutions)
						</Label>
						<Controller
							name={'whyzes_event_management_solutions'}
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
						<Label for='exampleText'>Why Zes (Client Satisfaction)</Label>
						<Controller
							name={'whyzes_clientsatisfaction'}
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
					onClick={handleReset}
				>
					Reset
				</Button> */}
			</form>
		</div>
	);
}
