import AddPromotions from '../add';
import axios from 'axios';
import { putCall } from '../../../../util/axios';
import { toast } from 'react-toastify';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useState } from 'react';

export default function EditPromotions() {
	const router = useRouter();
	const { id } = router.query;
	const [data, setData] = useState({});
	useEffect(() => {
		console.log(id);
		axios
			.get(`/api/promotions/${id}`)
			.then((res) => {
				if (res.data.data.length > 0) {
					console.log(res.data.data[0]);
					setData(res.data.data[0]);
				}
			})
			.catch((err) => {
				console.log(err);
			});
	}, [id]);

	const handleSubmit = (data, files) => {
		const formData = new FormData();

		// for (const key in data) {
		formData.append('name', data.name);
		// }
		formData.append('image', files);
		const config = {
			headers: { 'content-type': 'multipart/form-data' },
		};
		putCall(`/api/promotions/?id=${data.id}`, formData)
			.then((res) => {
				if (res.data.success) {
					console.log(res.data.success);
					router.push('/admin/promotions');
				} else {
					toast.error('Something went wrong');
				}
			})
			.catch((err) => {
				console.log(err);
			});
	};

	return (
		Object.keys(data).length > 0 && (
			<AddPromotions
				defaultValues={data}
				customSubmit={handleSubmit}
				title='Edit Promotions'
			/>
		)
	);
}
