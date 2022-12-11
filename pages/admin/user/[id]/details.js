import { useEffect, useState } from 'react';

import BaseCard from '../../../../components/baseCard/BaseCard';
import Image from 'next/image';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { Typography } from '@mui/material';
import axios from 'axios';
import { useRouter } from 'next/router';

export default function UserDetails() {
	const router = useRouter();
	const [data, setData] = useState({});
	const { id } = router.query;
	const data1 = [
		{ name: 'title', label: 'Title' },
		{ name: 'photo', label: 'Profile Photo' },
		{ name: 'firstName', label: 'First Name' },
		{ name: 'middleName', label: 'Middle Name' },
		{ name: 'lastName', label: 'Last Name' },
		{ name: 'mobile', label: 'Mobile Number' },
		{ name: 'email', label: 'Email' },
		{ name: 'country', label: 'Country' },
		{ name: 'city', label: 'Emirates City' },
		{ name: 'nationality', label: 'Nationality' },
		{ name: 'profession', label: 'Profession' },
		{ name: 'emiratesID', label: 'EmiratesId' },
		{ name: 'website', label: 'Website' },
		{ name: 'hobbies', label: 'Hobbies' },
		{ name: 'height', label: 'Height' },
		{ name: 'age', label: 'Age' },
		{ name: 'weight', label: 'Weight' },
	];

	const data4 = [
		{ name: 'expectations', label: 'Expectations' },
		{ name: 'makesHappy', label: 'What makes you happy?' },
	];

	useEffect(() => {
		axios
			.get(`/api/users/${id}`)
			.then((res) => {
				let tempData = res.data.data[0];
				setData(tempData);
			})
			.catch((err) => {
				console.log(err);
			});
	}, [id]);
	return (
		<div>
			<Typography variant='h4'>Details</Typography>
			<BaseCard title={`${data.firstName} ${data.middleName} ${data.lastName}`}>
				<Table sx={{ minWidth: 650 }} aria-label='simple table'>
					<TableHead>
						<TableRow>
							<TableCell>
								<strong>Label</strong>
							</TableCell>
							<TableCell>
								<strong>Value</strong>
							</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{data1.map(
							(item) =>
								data[item.name] && (
									<TableRow hover key={item.name}>
										<TableCell>{item.label}</TableCell>
										<TableCell>
											{item.name === 'photo' ? (
												<Image
													src={`${data[item.name]}`}
													width='100px'
													height='100px'
													alt='client'
													layout='responsive'
												/>
											) : (
												<strong>{data[item.name]}</strong>
											)}
										</TableCell>
									</TableRow>
								),
						)}
					</TableBody>
				</Table>
			</BaseCard>
		</div>
	);
}
