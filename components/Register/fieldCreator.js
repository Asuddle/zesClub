import { Autocomplete, CircularProgress, TextField } from '@mui/material';
import { Col, FormFeedback, FormGroup, Input, Label, Row } from 'reactstrap';
import { Controller, useForm } from 'react-hook-form';

import AsyncSelect from 'react-select/async';
import AutocompleteComponent from '../form/autocomplete';
import { SelectField } from './select';
import WysiwygComponent from '../form/wysiwyg';
import styles from '../../styles/Register.module.scss';

export default function FieldCreator({
	item,
	col = 4,
	control,
	errors,
	setValue,
	setFileInput,
	fileInput,
	formGroupStyle = styles.formGroup,
}) {
	if (item.type === 'text') {
		return (
			<Col md={col}>
				<Controller
					name={item.name}
					control={control}
					render={({ field }) => (
						<FormGroup className={formGroupStyle}>
							<Label className={styles.inputLabel}>{item.label}</Label>
							<Input
								// invalidn
								placeholder={item.label}
								{...field}
								className={styles.textField}
								invalid={errors[item.name]}
								{...(item.options || {})}
							/>
							{errors[item.name] && (
								<FormFeedback>{errors[item.name].message}</FormFeedback>
							)}
						</FormGroup>
					)}
				/>
			</Col>
		);
	} else if (item.type == 'select') {
		return (
			<Col md={col}>
				<Controller
					name={item.name}
					control={control}
					render={({ field }) => (
						<FormGroup className={formGroupStyle}>
							<Label className={styles.inputLabel} for='exampleSelect'>
								{item.label}
							</Label>
							<SelectField
								options={item.options || []}
								field={field}
								label={item.label}
								errors={errors}
							/>
						</FormGroup>
					)}
				/>
			</Col>
		);
	} else if (item.type == 'inline-text') {
		return (
			<Col md={12} key={item}>
				<Row>
					<Col md={4}>
						<Label className={styles.inputLabel} for='email'>
							{item.label}
						</Label>
					</Col>
					<Col md={6}>
						<Controller
							name={item.name}
							control={control}
							render={({ field }) => (
								<FormGroup style={{ padding: '0px' }}>
									<Input
										placeholder={item.label}
										{...field}
										className={styles.textField}
										invalid={errors[item.name]}
									/>
									{errors[item.name] && (
										<FormFeedback>{errors[item.name].message}</FormFeedback>
									)}
								</FormGroup>
							)}
						/>
					</Col>
				</Row>
			</Col>
		);
	} else if (item.type == 'inline-radio') {
		// haveBusiness
		return (
			<Col md={12}>
				<Row>
					<Col md={4}>
						<Label className={styles.inputLabel} for='email'>
							{item.label}
						</Label>
					</Col>
					<Col md={6}>
						<Controller
							name={item.name}
							control={control}
							render={({ field }) => (
								<FormGroup style={{ display: 'flex' }}>
									<FormGroup check>
										<Input {...field} type='radio' /> <Label check>Yes</Label>
									</FormGroup>
									<FormGroup check style={{ marginLeft: '20px' }}>
										<Input {...field} name='radio1' type='radio' />{' '}
										<Label check>No</Label>
									</FormGroup>
								</FormGroup>
							)}
						/>
					</Col>
				</Row>
			</Col>
		);
	} else if (item.type == 'textarea') {
		return (
			<Col md={5}>
				<FormGroup>
					<Label className={styles.inputLabel} for='exampleText'>
						{item.label}
					</Label>
					<Controller
						name={item.name}
						control={control}
						render={({ field }) => (
							<Input
								className={styles.textArea}
								id='exampleText'
								{...field}
								rows='5'
								invalid={errors[field.name]}
								type='textarea'
							/>
						)}
					/>
					{errors[item.name] && (
						<p className='error-message'>{errors[item.name].message}</p>
					)}
				</FormGroup>
			</Col>
		);
	} else if (item.type == 'autocomplete') {
		return (
			<Col md={5}>
				<FormGroup>
					<Label className={styles.inputLabel} for='exampleText'>
						{item.label}
					</Label>
					<Controller
						name={item.name}
						control={control}
						render={({ field }) => (
							<AutocompleteComponent url={item.url} field={field} />
						)}
					/>
					{errors[item.name] && (
						<p className='error-message'>{errors[item.name].message}</p>
					)}
				</FormGroup>
			</Col>
		);
	} else if (item.type == 'file') {
		const handleFileChange = (e, field) => {
			field.onChange(e.target.value);
			setFileInput(e.target.files[0]);
		};
		return (
			<Col md={5}>
				<FormGroup>
					<Label className={styles.inputLabel} for='exampleText'>
						{item.label}
					</Label>

					<Controller
						name={item.name}
						control={control}
						render={({ field }) => {
							// console.log(field);
							return (
								<>
									{fileInput && (
										<img
											width={300}
											height={200}
											style={{ marginBottom: '20px', marginLeft: '10px' }}
											src={URL.createObjectURL(fileInput)}
											alt='dsa'
										/>
									)}
									<br />
									<Input
										type='file'
										{...field}
										onChange={(e) => handleFileChange(e, field)}
										invalid={errors[field.name]}
										value={fileInput ? field.value : ''}
									/>
								</>
							);
						}}
					/>
					{errors[item.name] && (
						<p className='error-message'>{errors[item.name].message}</p>
					)}
				</FormGroup>
			</Col>
		);
	} else if (item.type == 'wysiwyg') {
		return (
			<Col md={col}>
				<FormGroup>
					<Label className={styles.inputLabel} for='exampleText'>
						{item.label}
					</Label>

					<Controller
						name={item.name}
						control={control}
						render={({ field }) => {
							return <WysiwygComponent field={field} />;
						}}
					/>
					{errors[item.name] && (
						<p className='error-message'>{errors[item.name].message}</p>
					)}
				</FormGroup>
			</Col>
		);
	}
}
