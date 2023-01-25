import { useEffect, useState } from 'react';

import RegisterForm from '../../../../components/Register/form';
import axios from 'axios';
import { useRouter } from 'next/router';

export default function EditCustomer() {
	const router = useRouter();
	const { id } = router.query;
	const [data, setData] = useState({});
	useEffect(() => {
		axios
			.get(`/api/users/${id}`)
			.then((res) => {
				let tempData = res.data.data[0];
				console.log('realData', res.data.data[0]);
				tempData.country = { value: tempData.country, label: tempData.country };
				tempData.title = { value: tempData.title, label: tempData.title };
				tempData.city = { value: tempData.city, label: tempData.city };
				tempData.interest = {
					value: tempData.interest,
					label: tempData.interest,
				};
				tempData.nationality = {
					value: tempData.nationality,
					label: tempData.nationality,
				};
				if (tempData.spouse_country) {
					tempData.spouse_country = {
						value: tempData.spouse_country,
						label: tempData.spouse_country,
					};
					tempData.spouse_title = {
						value: tempData.spouse_title,
						label: tempData.spouse_title,
					};
					tempData.spouse_city = {
						value: tempData.spouse_city,
						label: tempData.spouse_city,
					};
					tempData.spouse_interest = {
						value: tempData.spouse_interest,
						label: tempData.spouse_interest,
					};
					tempData.spouse_nationality = {
						value: tempData.spouse_nationality,
						label: tempData.spouse_nationality,
					};
				}
				console.log(tempData);
				setData(tempData);
			})
			.catch((err) => {
				console.error(err);
			});
	}, [id]);

	const onCustomSubmit = (data, file, passportInput, emiratesIdInput) => {
		const formData = new FormData();
		let result = {
			...data,
			...{
				title: data.title.value,
				interest: data.interest.value,
				city: data.city.value,
				haveOwnBusiness: 0,
				photo: file,
				// passportFile: passportInput,
				emiratesIdFile: emiratesIdInput,
				country: data.country.value,
				nationality: data.nationality.value,
				spouse_nationality: data.spouse_nationality?.value || '',
				spouse_title: data.spouse_title?.value || '',
				spouse_city: data.spouse_city?.value || '',
				spouse_country: data.spouse_country?.value || '',
			},
		};

		const config = {
			headers: { 'content-type': 'multipart/form-data' },
		};
		for (const key in result) {
			formData.append(key, result[key]);
		}
		axios
			.put(`/api/users/${id}`, result, config)
			.then((res) => {
				router.push('/admin/user');
				// setData(res.dat	a.data[0]);
			})
			.catch((err) => {
				console.error(err);
			});
	};

	return Object.keys(data).length > 0 ? (
		<RegisterForm
			defaultValue={data}
			onCustomSubmit={onCustomSubmit}
			tabValue={typeof data.spouse_firstName == 'string' ? 2 : 1}
		/>
	) : (
		<></>
	);
}
