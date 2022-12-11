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
				setData(tempData);
			})
			.catch((err) => {
				console.log(err);
			});
	}, [id]);

	return Object.keys(data).length > 0 ? (
		<RegisterForm defaultValue={data} />
	) : (
		<></>
	);
}
