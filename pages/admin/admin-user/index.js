import { Button, Typography } from '@mui/material';
import { useEffect, useState } from 'react';

import FeatherIcon from 'feather-icons-react';
import ModalComponent from '../../../components/admin/dialog';
import TableComponent from '../../../components/admin/table';
import axios from 'axios';
import { useRouter } from 'next/router';

export default function UserTable() {
	const [data, setData] = useState([]);
	const [refresh, setRefresh] = useState(false);
	const [openDelete, setOpenDelete] = useState(false);
	const router = useRouter();
	useEffect(() => {
		axios
			.get('/api/users/admin')
			.then((res) => {
				setData(res.data.data);
			})
			.catch((err) => {
				console.log(err);
			});
	}, [refresh]);
	const handleDeleteToggle = () => {
		setOpenDelete(!openDelete);
	};
	const handleEdit = (ev, id) => {
		ev.stopPropagation();
		router.push(`/admin/user/${id}/edit`);
	};
	const handleDetails = (data) => {
		router.push(`/admin/user/${data.user_id}/details`);
	};
	const col = [
		{ label: 'Id', name: 'id' },
		{ label: 'Email', name: 'email' },
		{ label: 'Role', name: 'role' },
		{
			label: 'Actions',
			render: (data) => (
				<>
					<Button
						onClick={handleDeleteToggle}
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
				data={data}
				title='Admin Users'
			/>
			<ModalComponent open={openDelete} toggle={handleDeleteToggle} />
		</>
	);
}
