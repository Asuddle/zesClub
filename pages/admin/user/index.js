import { Button, Typography } from '@mui/material';
import { useEffect, useState } from 'react';

import Modal from '../../../components/admin/dialog';
import TableComponent from '../../../components/admin/table';
import axios from 'axios';
import { useRouter } from 'next/router';

export default function UserTable() {
	const [data, setData] = useState([]);
	const [refresh, setRefresh] = useState(false);
	const [openDelete, setOpenDelete] = useState(false);
	const router = useRouter();

	const handleDeleteToggle = (ev) => {
		ev.stopPropagation();
		setOpenDelete(!openDelete);
	};
	useEffect(() => {
		axios.get('/api/auth').then((res) => {
			setData(res.data.data);
		});
	}, [refresh]);

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
	const handleDetails = (data) => {
		// console.log('data', data);
		router.push(`/admin/user/${data.user_id}/details`);
	};

	const col = [
		{ label: 'Id', name: 'id' },
		{ label: 'Name', name: 'firstName' },
		{ label: 'Email', name: 'email' },
		{ label: 'Phone', name: 'mobile' },
		{
			label: 'Actions',
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
						onClick={handleDeleteToggle}
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
				handleRowClick={handleDetails}
				col={col}
				data={data}
				title='Customer Management'
			/>
			<Modal open={openDelete} toggle={handleDeleteToggle} />
		</>
	);
}
