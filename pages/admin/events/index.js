import { Button } from '@mui/material';
import Modal from '../../../components/admin/dialog';
import TableComponent from '../../../components/admin/table';
import axios from 'axios';
import { deleteCall } from '../../../util/axios';
import { useRouter } from 'next/router';
import { useState } from 'react';

export default function EventTable() {
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
		deleteCall(`/api/events?id=${id}`)
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
		{ label: 'Name', name: 'name' },
		{ label: 'Price (AED)', name: 'price' },
		// { label: 'Description', name: 'description' },
		{ label: 'Date', name: 'date' },
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
							router.push(`/admin/events/${data.id}/edit`);
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
				url='/api/events'
				addButton
				col={col}
				refresh={refresh}
				handleRowClick={handleRow}
				addNewCallback={() => router.push('/admin/events/add')}
				title='Event Management'
			/>
			<Modal open={openDelete} handleDelete={handleDelete} toggle={toggle} />
		</>
	);
}
