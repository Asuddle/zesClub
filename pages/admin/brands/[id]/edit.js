import { useEffect, useState } from 'react';

import AddBrand from '../add';
import axios from 'axios';
import { putCall } from '../../../../util/axios';
import { useRouter } from 'next/router';

export default function EditBrand() {
	const router = useRouter();
	const [data, setData] = useState({});
	useEffect(() => {
		axios
			.get(`/api/brands/${router.query.id}`)
			.then((res) => {
				let dt = res.data.data[0];
				dt['category'] = dt.category_id;
				setData(dt);
				console.log(res.data);
			})
			.catch((err) => {
				console.log(err);
			});
	}, [router.query.id]);

	const handleSubmit = (data, file) => {
		const formData = new FormData();
		let result = {
			...data,
			...{
				category_id:
					typeof data.category == 'object'
						? data.category.value
						: data.category_id,
				image: file,
			},
		};
		for (const key in result) {
			formData.append(key, result[key]);
		}
		const config = {
			headers: { 'content-type': 'multipart/form-data' },
		};
		putCall(`/api/brands?id=${data.id}`, formData)
			.then((res) => {
				router.push('/admin/brands');
				console.log(res.data);
			})
			.catch((err) => {
				console.log(err);
			});
	};

	return (
		Object.keys(data).length > 0 && (
			<AddBrand
				defaultValues={data}
				title={'Edit Brand'}
				customSubmit={handleSubmit}
			/>
		)
	);
}
