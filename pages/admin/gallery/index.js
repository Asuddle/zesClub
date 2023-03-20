import { Button } from '@mui/material';
import Modal from '../../../components/admin/dialog';
import TableComponent from '../../../components/admin/table';
import axios from 'axios';
import { deleteCall } from '../../../util/axios';
import { useRouter } from 'next/router';
import { useState } from 'react';

export default function GalleryTable() {
	const router = useRouter();
	const [id, setId] = useState(0);
	const [openDelete, setOpenDelete] = useState(false);
	const [refresh, setRefresh] = useState(false);

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
		{ label: 'Price', name: 'price' },
		{ label: 'Venue', name: 'venue' },
		{ label: 'Date', name: 'createdDate' },
		{
			label: 'Actions',
			render: (data) => (
				<Button
					variant='contained'
					color='success'
					onClick={() => {
						router.push(`/admin/gallery/${data.id}/add`);
					}}
				>
					Gallery
				</Button>
			),
		},
	];
	const handleRow = (data) => {
		// router.push(`/admin/events/${data.id}/details`);
	};
	return (
		<>
			<TableComponent
				url='/api/events/all'
				col={col}
				refresh={refresh}
				// handleRowClick={handleRow}
				title='Gallery'
			/>
			<Modal open={openDelete} handleDelete={handleDelete} toggle={toggle} />
		</>
	);
}
