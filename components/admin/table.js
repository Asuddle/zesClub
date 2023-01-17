import {
	Box,
	Button,
	Chip,
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableRow,
	TextField,
	Typography,
} from '@mui/material';
import { useEffect, useState } from 'react';

import BaseCard from '../baseCard/BaseCard';
import { CSVLink } from 'react-csv';
import axios from 'axios';
import styles from '../../styles/component.module.scss';

export default function TableComponent({
	col,
	title = 'User Management',
	handleRowClick = () => {},
	addButton = false,
	url = '/api/enquiry',
	refresh = false,
	csvHeaders = [],
	addNewCallback = () => {},
}) {
	const [data, setData] = useState([]);
	const [searchText, setSearchText] = useState('');
	const handleSearchChange = (e) => {
		setSearchText(e.target.value);
	};
	useEffect(() => {
		setData([]);
		axios.get(`${url}?q=${searchText}`).then((res) => {
			setData(res.data.data);
		});
	}, [searchText, refresh]);
	return (
		<BaseCard title={title}>
			{addButton && (
				<Button
					onClick={addNewCallback}
					variant='contained'
					style={{ float: 'right' }}
					color='success'
				>
					Add New +
				</Button>
			)}

			<TextField
				fullWidth
				size='small'
				// variant='contained'
				// value={searchText}
				onChange={handleSearchChange}
				style={{ width: '400px', marginTop: '32px' }}
				placeholder='Search'
			/>

			{csvHeaders.length > 0 && (
				<CSVLink
					filename={title}
					className={styles.csvLink}
					data={data}
					headers={csvHeaders}
				>
					Download CSV
				</CSVLink>
			)}
			<Table
				aria-label='table'
				fixedHeader={false}
				style={{ tableLayout: 'auto', overflow: 'auto' }}
				sx={{
					mt: 3,
					// whiteSpace: 'nowrap',
				}}
			>
				<TableHead>
					<TableRow>
						{col.map((item) => (
							<TableCell
								key={item.label}
								width={item.width || '20%'}
								align={item.align || 'left'}
							>
								<Typography color='textSecondary' variant='h6'>
									{item.label}
								</Typography>
							</TableCell>
						))}
					</TableRow>
				</TableHead>
				<TableBody>
					{data.map((item) => {
						const arr = [];
						col.forEach((cl) => {
							arr.push(
								<TableCell
									key={item.id}
									width={cl.width || '20%'}
									align={cl.align || 'left'}
								>
									{cl?.render ? cl.render(item) : item[cl.name] || '-'}
								</TableCell>,
							);
						});

						return (
							<TableRow
								hover
								tabIndex={-1}
								key={item.name}
								onClick={() => handleRowClick(item)}
							>
								{arr}
							</TableRow>
						);
					})}
				</TableBody>
				{/* <TableFooter>
					<TableRow>
						<TablePagination
							rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
							colSpan={3}
							count={data.length}
							rowsPerPage={rowsPerPage}
							page={page}
							SelectProps={{
								inputProps: {
									'aria-label': 'rows per page',
								},
								native: true,
							}}
							onPageChange={handleChangePage}
							onRowsPerPageChange={handleChangeRowsPerPage}
							ActionsComponent={TablePaginationActions}
						/>
					</TableRow>
				</TableFooter> */}
			</Table>
		</BaseCard>
	);
}
