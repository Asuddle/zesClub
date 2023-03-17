import { Button, Typography } from '@mui/material';
import { useEffect, useState } from 'react';

import Modal from '../../../components/admin/dialog';
import TableComponent from '../../../components/admin/table';
import axios from 'axios';
import { useRouter } from 'next/router';

export default function DealsTable() {
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
			.delete(`/api/deals?id=${id}`)
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
	function downloadImage(url, name) {
		fetch(url)
			.then((resp) => resp.blob())
			.then((blob) => {
				const url = window.URL.createObjectURL(blob);
				const a = document.createElement('a');
				a.style.display = 'none';
				a.href = url;
				// the filename you want
				a.download = name;
				document.body.appendChild(a);
				a.click();
				window.URL.revokeObjectURL(url);
			})
			.catch(() => alert('An error sorry'));
	}
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
			label: 'Brand',
			name: 'brands',
		},
		{
			label: 'Price',
			name: 'price',
		},
		{
			label: 'Actions',
			render: (data) => (
				<div>
					<Button
						size='small'
						variant='contained'
						color='success'
						onClick={(ev) => {
							downloadImage(`/${data.qr}`, data.name);
						}}
					>
						Get Qr{' '}
					</Button>
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
							router.push(`/admin/deals/${data.id}/edit`);
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
				url='/api/deals'
				addButton
				addNewCallback={() => router.push('/admin/deals/add')}
				title='Deals'
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
