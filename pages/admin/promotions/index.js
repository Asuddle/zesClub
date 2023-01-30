import { Button, Typography } from '@mui/material';
import { useEffect, useState } from 'react';

import Modal from '../../../components/admin/dialog';
import TableComponent from '../../../components/admin/table';
import axios from 'axios';
import { useRouter } from 'next/router';

export default function PromotionTable() {
	const [refresh, setRefresh] = useState(false);
	const [id, setId] = useState(0);

	const [openDelete, setOpenDelete] = useState(false);
	const router = useRouter();

	const handleDeleteToggle = (ev, id) => {
		ev.stopPropagation();
		setId(id);
		setOpenDelete(!openDelete);
	};
	const toggleDelete = () => {
		setOpenDelete(!openDelete);
	};
	const handleDelete = () => {
		axios
			.delete(`/api/promotions?id=${id}`)
			.then((res) => {
				toggleDelete();
				// console.log(res.data);
				setRefresh(!refresh);
				setId(0);
			})
			.catch((err) => {
				console.log(err);
			});
	};

	const col = [
		{ label: 'Id', name: 'id' },
		{ label: 'Name', name: 'name' },
		{
			label: 'Image',
			name: 'image',
			render: (data) => (
				<div>
					<img src={`/${data.image}`} width={150} />
				</div>
			),
		},
		{
			label: 'Actions',
			render: (data) => (
				<div>
					<Button
						size='small'
						variant='contained'
						color='error'
						onClick={(ev) => handleDeleteToggle(ev, data.id)}
					>
						Delete
					</Button>
					<Button
						size='small'
						variant='contained'
						color='secondary'
						onClick={() => {
							router.push(`/admin/promotions/${data.id}/edit`);
						}}
					>
						Edit
					</Button>
				</div>
			),
		},
	];

	return (
		<>
			<TableComponent
				col={col}
				url='/api/promotions'
				addButton
				addNewCallback={() => router.push('/admin/promotions/add')}
				title='Promotions Management'
				refresh={refresh}
			/>
			<Modal
				open={openDelete}
				toggle={toggleDelete}
				handleDelete={handleDelete}
			/>
		</>
	);
}
