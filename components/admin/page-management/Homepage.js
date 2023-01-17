import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import * as yup from 'yup';

import { Button, FormGroup, Input, Label, Row } from 'reactstrap';

import { Editor } from 'react-draft-wysiwyg';
import FieldCreator from '../../Register/fieldCreator';
import { Typography } from '@mui/material';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

export default function HomePageForm() {
	const validationSchema = yup.object({});
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
		console.log('data', data);
	};

	return (
		<div>
			<Typography variant='h4'>Event Management</Typography>
			<br />
			<form onSubmit={handleSubmit(onSubmit)}>
				<Row className='row g-3'>
					<FormGroup style={{ width: '100%' }}>
						<Label for='exampleText'>Home (Event Management)</Label>
						<Input
							type='textarea'
							name='text'
							id='exampleText'
							style={{ width: '550px', height: '220px' }}
						/>
					</FormGroup>
				</Row>

				<Button color='success' variant='contained' style={{ float: 'right' }}>
					Save
				</Button>

				<Button
					color='secondary'
					variant='contained'
					style={{ float: 'right', marginRight: '8px' }}
				>
					Reset
				</Button>
			</form>
		</div>
	);
}
