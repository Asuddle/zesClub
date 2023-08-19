import { useEffect, useState } from 'react';

import BaseCard from './baseCard/BaseCard';
import Image from 'next/image';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { Typography } from '@mui/material';
import axios from 'axios';
import { getCall } from '../util/axios';
import { useRouter } from 'next/router';

export default function DetailComponent({
	url = '',
	dataObj = {},
	images = [],
	title = 'Details',
	heading = 'name',
}) {
	const router = useRouter();
	const [data, setData] = useState({});
	const { id } = router.query;

	useEffect(() => {
		getCall(`${url}/${id}`)
			.then((res) => {
				let tempData = res.data.data[0];
				let filteredData = {};
				for (const key in tempData) {
					if (tempData[key]) {
						filteredData[key] = tempData[key];
					}
				}
				setData(filteredData);
			})
			.catch((err) => {
				console.log(err);
			});
	}, [id]);
	return (
		<div>
			<Typography variant='h4'>{title}</Typography>
			<BaseCard title={`${data[heading]}`}>
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
						{dataObj.map(
							(item) =>
								data[item.name] && (
									<TableRow hover key={item.name}>
										<TableCell>{item.label}</TableCell>
										<TableCell>
											{images.includes(item.name) ? (
												<img
													src={`/${data[item.name]}`.replace('//', '/')}
													width='200'
													height='200'
													alt='client'
													// layout='responsive' hhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh r23456788877
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
