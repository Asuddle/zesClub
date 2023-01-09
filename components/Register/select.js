import Select from 'react-select';
import styles from '../../styles/Register.module.scss';

const customStyles = {
	control: (provided, state) => ({
		...provided,
		height: 40,
		border: '1px solid #686868',
		boxShadow: 'none',
	}),
	dropdownIndicator: (provided, state) => ({
		...provided,
		background: '#bababa',
		borderRadius: '50px',
		padding: '0px',
		color: 'white',
		marginRight: '6px',
	}),
};

const errorStyles = {
	control: (provided, state) => ({
		...provided,
		height: 40,
		border: '1px solid #E04856',
		boxShadow: 'none',
	}),
	dropdownIndicator: (provided, state) => ({
		...provided,
		background: '#bababa',
		borderRadius: '50px',
		padding: '0px',
		color: 'white',
		marginRight: '6px',
	}),
};
const defaultOptions = [
	{
		value: 'ocean',
		label: 'Ocean',
		color: '#00B8D9',
	},
	{
		value: 'blue',
		label: 'Blue',
		color: '#0052CC',
	},
];

export const SelectField = ({
	options = defaultOptions,
	field,
	errors,
	label,
}) => {
	// console.log(options.find((item) => item.value === field.value));
	return (
		<>
			<Select
				styles={errors[field.name] ? errorStyles : customStyles}
				className={styles.select}
				// defaultValue={options.find((item) => item.value === field.value)}
				// defaultInputValue={field.value}
				{...field}
				components={{
					IndicatorSeparator: () => null,
				}}
				placeholder={<div className={styles.placeholder}>{label}</div>}
				options={options}
			/>
			<div>
				{errors[field.name] && (
					<p className='error-message'>{errors[field.name].message}</p>
				)}
			</div>
		</>
	);
};
