import { Button } from '@mui/material';
import ModalComponent from '../../../components/admin/dialog';
import TableComponent from '../../../components/admin/table';
import { useRouter } from 'next/router';
import { useState } from 'react';

export default function UserTable() {
	const [openDelete, setOpenDelete] = useState(false);
	const router = useRouter();

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
				url='/api/users/admin'
				title='Admin Users'
			/>
			<ModalComponent open={openDelete} toggle={handleDeleteToggle} />
		</>
	);
}
