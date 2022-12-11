import { Col, FormFeedback, FormGroup, Input, Label, Row } from 'reactstrap';
import { Controller, useForm } from 'react-hook-form';

import { SelectField } from './select';
import styles from '../../styles/Register.module.scss';

export default function FieldCreator({
	item,
	col = 4,
	control,
	errors,
	setValue,
	setFileInput,
}) {
	if (item.type === 'text') {
		return (
			<Col md={col}>
				<Controller
					name={item.name}
					control={control}
					render={({ field }) => (
						<FormGroup className={styles.formGroup}>
							<Label className={styles.inputLabel}>{item.label}</Label>
							<Input
								// invalid
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
						<FormGroup className={styles.formGroup}>
							<Label className={styles.inputLabel} for='exampleSelect'>
								{item.label}
							</Label>
							<SelectField
								options={item.options || []}
								field={field}
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
										placeholder='Email'
										{...field}
										className={styles.textField}
										id='email'
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
	} else if (item.type == 'file') {
		const handleFileChange = (e, field) => {
			// setValue
			field.onChange(e.target.value);
			console.log('vall', e.target.value);
			setFileInput(e.target.files[0]);
			// setValue(item.name, e.target.value);
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
							console.log(field);
							return (
								<Input
									type='file'
									{...field}
									// value={''}
									onChange={(e) => handleFileChange(e, field)}
									invalid={errors[field.name]}
								/>
							);
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
