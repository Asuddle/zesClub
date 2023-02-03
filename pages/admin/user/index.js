import { Button } from '@mui/material';
import Modal from '../../../components/admin/dialog';
import TableComponent from '../../../components/admin/table';
import axios from 'axios';
import { useRouter } from 'next/router';
import { useState } from 'react';

export default function UserTable() {
	const [refresh, setRefresh] = useState(false);
	const [openDelete, setOpenDelete] = useState(false);
	const [id, setId] = useState(0);
	const router = useRouter();

	const handleDeleteToggle = (ev, id = 0) => {
		ev.stopPropagation();
		setId(id);
		setOpenDelete(!openDelete);
	};

	const verifyUser = (id) => {
		axios
			.put(`/api/users/verify?userId=${id}`)
			.then((res) => {
				setRefresh(!refresh);
			})
			.catch((err) => {
				console.log(err);
			});
	};
	const handleEdit = (ev, id) => {
		ev.stopPropagation();
		router.push(`/admin/user/${id}/edit`);
	};
	const handleDelete = () => {
		axios
			.delete(`/api/users/${id}`)
			.then((res) => {
				setOpenDelete(!openDelete);
				setRefresh(!refresh);
			})
			.catch((err) => {
				console.log(err);
			});
	};

	const handleDetails = (data) => {
		router.push(`/admin/user/${data.user_id}/details`);
	};

	const csvHeaders = [
		{ label: 'Id', key: 'id' },
		{ label: 'First Name', key: 'firstName' },
		{ label: 'Last Name', key: 'lastName' },
		{ label: 'email', key: 'email' },
		{ label: 'phone', key: 'mobile' },
		{ label: 'Country', key: 'country' },
		{ label: 'City', key: 'city' },
		{ label: 'Website', key: 'website' },
		{ label: 'Nationality', key: 'nationality' },
		{ label: 'Profession', key: 'profession' },
		{ label: 'EmiratesId', key: 'emiratesID' },
		{ label: 'Hobbies', key: 'hobbies' },
		{ label: 'Interest', key: 'interest' },
		{ label: 'Age', key: 'age' },
		{ label: 'Height', key: 'height' },
		{ label: 'Weight', key: 'weight' },
		{ label: 'What makes you happy?', key: 'makeHappy' },
	];
	const col = [
		{ label: 'Id', name: 'id', width: '5%' },
		{ label: 'Name', name: 'firstName', width: '20%' },
		{ label: 'Email', name: 'email', width: '20%' },
		{ label: 'Phone', name: 'mobile', width: '20%' },
		{
			label: 'Actions',
			width: '20%',
			render: (data) => (
				<div>
					{!data.isVerified && (
						<Button
							variant='contained'
							color='primary'
							size='small'
							onClick={(event) => {
								event.stopPropagation();
								verifyUser(data.user_id);
							}}
						>
							Verify
						</Button>
					)}
					<Button
						size='small'
						variant='contained'
						color='error'
						onClick={(ev) => handleDeleteToggle(ev, data.user_id)}
					>
						Delete
					</Button>
					<Button
						size='small'
						variant='contained'
						color='secondary'
						onClick={(ev) => handleEdit(ev, data.user_id)}
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
				csvHeaders={csvHeaders}
				handleRowClick={handleDetails}
				col={col}
				addButton
				refresh={refresh}
				url='/api/users'
				addNewCallback={() => router.push('/admin/user/add')}
				title='Customer Management'
			/>
			<Modal
				handleDelete={handleDelete}
				open={openDelete}
				toggle={handleDeleteToggle}
			/>
		</>
	);
}
