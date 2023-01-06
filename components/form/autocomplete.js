import { useEffect, useState } from 'react';

import AsyncSelect from 'react-select/async';
import axios from 'axios';

export default function AutocompleteComponent({
	field,
	url = '/api/events',
	valueLabel = 'name',
}) {
	const [options, setOptions] = useState([]);
	useEffect(() => {
		axios
			.get(url)
			.then((res) => {
				let dt = res.data.data;
				dt = dt.map((item) => ({ label: item.name, value: item.id }));
				setOptions(dt);
			})
			.catch((err) => {
				console.log(err);
			});
	}, []);

	const promiseOptions = (inputValue = '', callback) => {
		console.log(inputValue);
		if (inputValue !== '') {
			axios
				.get(`${url}?q=${inputValue}`)
				.then((res) => {
					let dt = res.data.data;
					dt = dt.map((item) => ({ label: item[valueLabel], value: item.id }));
					callback(dt);
				})
				.catch((err) => {
					console.log(err);
				});
		}
	};
	return (
		<div>
			<AsyncSelect
				{...field}
				defaultOptions={options}
				loadOptions={promiseOptions}
			/>
		</div>
	);
}
