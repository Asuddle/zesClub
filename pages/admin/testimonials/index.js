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
import draftToHtml from 'draftjs-to-html';
import { stateToHTML } from 'draft-js-export-html';
import { useRouter } from 'next/router';
import { useState } from 'react';

export default function TestimonialTable() {
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
		axios
			.delete(`/api/testimonials?id=${id}`)
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
		{ label: 'Name', name: 'name' },
		{ label: 'Designation', name: 'designation' },
		{
			label: 'Image',
			name: 'image',
			render: (data) =>
				data.image ? <img src={`/${data.image}`} width={150} /> : '',
		},
		{
			label: 'Description',
			name: 'description',
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
							router.push(`/admin/testimonials/${data.id}/edit`);
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

	return (
		<>
			<TableComponent
				url='/api/testimonials'
				addButton
				col={col}
				refresh={refresh}
				// handleRowClick={handleRow}
				addNewCallback={() => router.push('/admin/testimonials/add')}
				title='Testimonials'
			/>
			<Modal open={openDelete} handleDelete={handleDelete} toggle={toggle} />
		</>
	);
}
