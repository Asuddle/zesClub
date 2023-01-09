import { EditorState, convertFromRaw } from 'draft-js';

import AddService from '../add';
import axios from 'axios';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useState } from 'react';

export default function EditService() {
	const router = useRouter();
	const [data, setData] = useState({});
	console.log(router.query);
	useEffect(() => {
		if (router.query.id) {
			axios.get(`/api/services/${router.query.id}`).then((res) => {
				const dt = res.data.data[0];
				console.log(res.data.data[0]);
				const contentState = convertFromRaw(JSON.parse(dt.description));
				const editorState = EditorState.createWithContent(contentState);
				console.log(editorState);
				setData({
					...res.data.data[0],
					...{ description: editorState, defDes: dt.description },
				});
			});
		}
	}, [router.query.id]);

	return (
		<div>
			{Object.keys(data).length > 0 && (
				<AddService
					defaultValues={data}
					edit={true}
					serviceId={router.query.id}
				/>
			)}
		</div>
	);
}
