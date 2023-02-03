import AddDeals from '../add';
import axios from 'axios';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useState } from 'react';

export default function EditDeals() {
	const [data, setData] = useState({});
	const router = useRouter();
	console.log(router.query.id);
	useEffect(() => {
		if (router.query.id) {
			axios
				.get(`/api/deals/${router.query.id}`)
				.then((res) => {
					let dt = res.data.data[0];
					dt['brand'] = dt.brand_id;
					setData(dt);
					// console.log(res.data.data);
					// setData(res.data.data[0]);
				})
				.catch((err) => {
					console.log(err);
				});
		}
	}, [router.query.id]);

	const handleSubmit = (data, files) => {
		console.log(data, files);
		const formData = new FormData();
		let result = {
			...data,
			...{
				brand_id:
					typeof data.brand == 'object' ? data.brand.value : data.brand_id,
				image: files,
			},
		};
		for (const key in result) {
			formData.append(key, result[key]);
		}
		const config = {
			headers: { 'content-type': 'multipart/form-data' },
		};
		axios
			.put(`/api/deals?id=${router.query.id}`, formData, config)
			.then((res) => {
				console.log(res.data);
				if (res.data.success) {
					router.push('/admin/deals');
				} else {
					toast.error('Something went wrong');
				}
			})
			.catch((err) => {
				toast.error('Something went wrong');
				console.log(err);
			});
	};

	return (
		Object.keys(data).length > 0 && (
			<AddDeals
				customSubmit={handleSubmit}
				defaultValues={data}
				title='Edit Deal'
			/>
		)
	);
}
