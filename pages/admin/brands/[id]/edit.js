import { useEffect, useState } from 'react';

import AddBrand from '../add';
import axios from 'axios';
import { useRouter } from 'next/router';

export default function EditBrand() {
	const router = useRouter();
	const [data, setData] = useState({});
	console.log(router.query.id);
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

	return (
		Object.keys(data).length > 0 && (
			<AddBrand defaultValues={data} title={'Edit Brand'} />
		)
	);
}
