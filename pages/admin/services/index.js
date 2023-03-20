import {
	ContentState,
	EditorState,
	convertFromRaw,
	convertToRaw,
} from 'draft-js';

import { Button } from '@mui/material';
import Modal from '../../../components/admin/dialog';
import TableComponent from '../../../components/admin/table';
import axios from 'axios';
import { deleteCall } from '../../../util/axios';
import draftToHtml from 'draftjs-to-html';
import { stateToHTML } from 'draft-js-export-html';
import { useRouter } from 'next/router';
import { useState } from 'react';

export default function ServicesTable() {
	const router = useRouter();
	const [id, setId] = useState(0);
	const [openDelete, setOpenDelete] = useState(false);
	const [refresh, setRefresh] = useState(false);
	const handleDeleteToggle = (event, id) => {
		event.stopPropagation();
		setId(id);
		setOpenDelete(!openDelete);
	};
	const toggle = () => {
		setOpenDelete(!openDelete);
	};

	const handleDelete = () => {
		deleteCall(`/api/services?id=${id}`)
			.then((res) => {
				setId(0);
				setRefresh(!refresh);
				toggle();
			})
			.catch((err) => {
				console.log(err);
			});
	};

	const col = [
		{
			label: 'Image',
			name: 'name',
			render: (data) => (
				<div>
					<img src={`/${data.image}`} width={150} />
				</div>
			),
		},
		{ label: 'Title', name: 'title' },
		{
			label: 'description',
			name: 'description',
			render: (data) => {
				const contentState = convertFromRaw(JSON.parse(data.description));
				const editorState = EditorState.createWithContent(contentState);
				return (
					<div
						dangerouslySetInnerHTML={{
							__html: stateToHTML(editorState.getCurrentContent()),
						}}
					></div>
				);
				// stateToHTML(editorState.getCurrentContent());
			},
		},
		{
			label: 'Actions',
			width: '30%',
			render: (data) => (
				<div>
					<Button
						size='small'
						variant='contained'
						color='secondary'
						onClick={(ev) => {
							ev.stopPropagation();
							router.push(`/admin/services/${data.id}/edit`);
						}}
					>
						Edit
					</Button>
					{'    '}
					<Button
						size='small'
						onClick={(ev) => {
							ev.stopPropagation();
							handleDeleteToggle(ev, data.id);
						}}
						variant='contained'
						color='danger'
					>
						Delete
					</Button>
				</div>
			),
		},
	];
	const handleRow = (data) => {
		router.push(`/admin/events/${data.id}/details`);
	};
	return (
		<>
			<TableComponent
				url='/api/services'
				addButton
				col={col}
				refresh={refresh}
				// handleRowClick={handleRow}
				addNewCallback={() => router.push('/admin/services/add')}
				title='Services'
			/>
			<Modal open={openDelete} handleDelete={handleDelete} toggle={toggle} />
		</>
	);
}
