import { Button, Typography } from '@mui/material';
import { useEffect, useState } from 'react';

import Modal from '../../../components/admin/dialog';
import TableComponent from '../../../components/admin/table';
import axios from 'axios';
import { useRouter } from 'next/router';

export default function SelectPromotionsTable() {
	const [data, setData] = useState([]);
	const [refresh, setRefresh] = useState(false);
	const [openDelete, setOpenDelete] = useState(false);
	const router = useRouter();

	const handleDeleteToggle = () => {
		setOpenDelete(!openDelete);
	};

	const col = [
		{ label: 'Id', name: 'id' },
		{ label: 'Name', name: 'name' },
		{
			label: 'Image',
			name: 'image',
			render: (data) => <img src={`/${data.image}`} width={150} />,
		},
		{ label: 'Category', name: 'categoryName' },
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
							router.push(`/admin/brands/${data.id}/edit`);
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
				url='/api/brands'
				addButton
				addNewCallback={() => router.push('/admin/brands/add')}
				title='Brands'
			/>
			<Modal open={openDelete} toggle={handleDeleteToggle} />
		</>
	);
}
