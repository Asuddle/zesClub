import { Button, Typography } from '@mui/material';
import { useEffect, useState } from 'react';

import Modal from '../../../components/admin/dialog';
import TableComponent from '../../../components/admin/table';
import axios from 'axios';
import { useRouter } from 'next/router';

export default function EventTable() {
	const [data, setData] = useState([]);
	const [refresh, setRefresh] = useState(false);
	const [openDelete, setOpenDelete] = useState(false);
	const router = useRouter();

	const handleDeleteToggle = () => {
		setOpenDelete(!openDelete);
	};

	const verifyUser = (id) => {
		axios
			.put(`/api/users/verify?userId=${id}`)
			.then((res) => {
				console.log(res.data.data);
				setRefresh(!refresh);
			})
			.catch((err) => {
				console.log(err);
			});
	};
	const handleEdit = () => {
		router.push('/admin/user/2');
	};
	const col = [
		{ label: 'Id', name: 'id' },
		{ label: 'Name', name: 'firstName' },
		{ label: 'Email', name: 'email' },
		{ label: 'Phone', name: 'mobile' },
		{
			label: 'Actions',
			render: (data) =>
				!data.isVerified ? (
					<div>
						<Button
							variant='contained'
							color='primary'
							size='small'
							onClick={() => verifyUser(data.user_id)}
						>
							Verify
						</Button>
						<Button
							size='small'
							variant='contained'
							color='error'
							onClick={handleDeleteToggle}
						>
							Delete
						</Button>
						<Button size='small' variant='contained' color='secondary'>
							Edit
						</Button>
					</div>
				) : (
					<div>
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
							onClick={handleEdit}
						>
							Edit
						</Button>
					</div>
				),
		},
	];
	return (
		<>
			<TableComponent col={col} data={data} title='Event Management' />
			<Modal open={openDelete} toggle={handleDeleteToggle} />
		</>
	);
}
