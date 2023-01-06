import { Button } from '@mui/material';
import Modal from '../../../components/admin/dialog';
import TableComponent from '../../../components/admin/table';
import axios from 'axios';
import { useRouter } from 'next/router';
import { useState } from 'react';

export default function BookingTable() {
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

	const col = [
		{ label: 'User Email', name: 'email' },
		{
			label: 'Name',
			name: 'date',
			render: (data) => (
				<div>
					{data.firstName} {data.lastName}
				</div>
			),
		},
		{ label: 'Event', name: 'event_name' },
		{ label: 'Price (AED)', name: 'price' },
		// { label: 'Description', name: 'description' },

		{
			label: 'Actions',
			width: '30%',
			render: (data) => (
				<div>
					<Button size='small' variant='contained' color='secondary'>
						Edit
					</Button>
					{'    '}
					<Button size='small' variant='contained' color='danger'>
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
				url='/api/booking'
				addButton
				col={col}
				refresh={refresh}
				handleRowClick={handleRow}
				addNewCallback={() => router.push('/admin/bookings/add')}
				title='Booking Management'
			/>
			<Modal open={openDelete} toggle={toggle} />
		</>
	);
}
