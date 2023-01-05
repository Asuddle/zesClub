import 'bootstrap/dist/css/bootstrap.min.css';

import { Button } from '@mui/material';
import ModalComponent from '../../components/admin/dialog';
import TableComponent from '../../components/admin/table';
import axios from 'axios';
import { useState } from 'react';

const csvHeaders = [
	{ label: 'Id', key: 'id' },
	{ label: 'Title', key: 'title' },
	{ label: 'First Name', key: 'firstName' },
	{ label: 'Last Name', key: 'lastName' },
	{ label: 'Email', key: 'email' },
	{ label: 'Message', key: 'message' },
];

export default function EnquiryTable() {
	const [openDelete, setOpenDelete] = useState(false);
	const [deleteId, setDeleteId] = useState(0);
	const [refresh, setRefresh] = useState(false);
	const handleDeleteToggle = (ev, id = 0) => {
		ev.stopPropagation();
		setDeleteId(id);
		setOpenDelete(!openDelete);
	};
	const handleDelete = () => {
		axios
			.delete(`/api/enquiry?id=${deleteId}`)
			.then((res) => {
				setOpenDelete(false);
				setDeleteId(0);
				setRefresh(!refresh);
			})
			.catch((err) => {
				console.error(err);
			});
	};

	const handleToggle = () => {
		setOpenDelete(!openDelete);
	};
	const col = [
		{ label: 'Id', name: 'id', width: '5%' },
		{
			label: 'Name',
			width: '15%',
			render: (data) => (
				<p style={{ margin: '0px' }}>
					{data.firstName} {data.lastName}
				</p>
			),
		},
		{ label: 'Email', name: 'email', width: '15%' },
		{ label: 'Message', name: 'message', width: '40%' },
		{ label: 'Enquiry Type', name: 'enquiryType', width: '15%' },
		{
			label: 'Actions',
			width: '20%',
			align: 'right',
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
				</div>
			),
		},
	];

	return (
		<div>
			<TableComponent
				csvHeaders={csvHeaders}
				refresh={refresh}
				col={col}
				title='Enquiry Management'
			/>
			<ModalComponent
				handleDelete={handleDelete}
				open={openDelete}
				toggle={handleToggle}
			/>
		</div>
	);
}
