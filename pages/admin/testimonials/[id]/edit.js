import { useEffect, useState } from 'react';

import AddTestimonial from '../add';
import axios from 'axios';
import { useRouter } from 'next/router';

export default function EditTestimonial() {
	const router = useRouter();
	const [data, setData] = useState({});

	useEffect(() => {
		if (router.query.id) {
			axios.get(`/api/testimonials/${router.query.id}`).then((res) => {
				const dt = res.data.data[0];
				console.log(res.data.data[0]);
				setData(res.data.data[0]);
			});
		}
	}, [router.query.id]);

	return (
		<div>
			{Object.keys(data).length > 0 && (
				<AddTestimonial
					defaultValues={data}
					edit={true}
					testimonialId={router.query.id}
				/>
			)}
		</div>
	);
}
