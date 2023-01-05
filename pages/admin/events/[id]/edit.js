import { useEffect, useState } from 'react';

import AddEvent from '../add';
import axios from 'axios';
import { useRouter } from 'next/router';

export default function EditEvent() {
	const router = useRouter();
	const [data, setData] = useState({});
	useEffect(() => {
		if (router.query.id) {
			axios
				.get(`/api/events/${router.query.id}`)
				.then((response) => {
					setData({ ...response.data.data[0], image: '' });
				})
				.catch((error) => {
					console.log(error);
				});
		}
	}, [router.query.id]);
	return Object.keys(data).length > 0 ? (
		<AddEvent defaultValues={data} method='put' title='Edit Event' />
	) : (
		<div>loading...</div>
	);
}
