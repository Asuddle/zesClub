import { Button } from '@mui/material';
import ModalComponent from '../../../components/admin/dialog';
import TableComponent from '../../../components/admin/table';
import axios from 'axios';
import { deleteCall } from '../../../util/axios';
import { useRouter } from 'next/router';
import { useState } from 'react';

export default function UserTable() {
	const [openDelete, setOpenDelete] = useState(false);
	const [id, setId] = useState();
	const [refresh, setRefresh] = useState(false);
	const router = useRouter();

	const handleDeleteToggle = (ev, userId) => {
		ev.stopPropagation();
		setId(userId);
		setOpenDelete(!openDelete);
	};

	const handleEdit = (ev, id) => {
		ev.stopPropagation();
		router.push(`/admin/user/${id}/edit`);
	};

	const handleDelete = () => {
		deleteCall(`/api/users/admin?userId=${id}`)
			.then((res) => {
				setRefresh(!refresh);
				setOpenDelete(!openDelete);
			})
			.catch((err) => {
				console.log(err);
			});
	};

	const handleDetails = (data) => {
		router.push(`/admin/user/${data.user_id}/details`);
	};

	const col = [
		{ label: 'Id', name: 'id' },
		{ label: 'Email', name: 'email' },
		{
			label: 'Name',
			render: (data) => (
				<>
					<p>
						{data.firstName} {data.lastName}
					</p>
				</>
			),
		},
		{
			label: 'Actions',
			render: (data) => (
				<>
					<Button
						onClick={(ev) => handleDeleteToggle(ev, data.user_id)}
						size='small'
						variant='contained'
						color='error'
					>
						Delete
					</Button>
					<Button
						onClick={(ev) => handleEdit(ev, data.user_id)}
						size='small'
						variant='contained'
						color='secondary'
					>
						Edit
					</Button>
				</>
			),
		},
	];

	return (
		<>
			<TableComponent
				handleRowClick={handleDetails}
				col={col}
				url='/api/users/admin'
				addButton
				refresh={refresh}
				addNewCallback={() => router.push('/admin/admin-user/add')}
				title='Admin Users'
			/>
			<ModalComponent
				handleDelete={handleDelete}
				open={openDelete}
				toggle={handleDeleteToggle}
			/>
		</>
	);
}
