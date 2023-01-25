import {
	Box,
	Button,
	Chip,
	Table,
	TableBody,
	TableCell,
	TableFooter,
	TableHead,
	TablePagination,
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
	const [order, setOrder] = useState('asc');
	const [orderBy, setOrderBy] = useState('calories');
	const [page, setPage] = useState(0);
	const [rowsPerPage, setRowsPerPage] = useState(5);

	const [searchText, setSearchText] = useState('');
	const handleSearchChange = (e) => {
		setSearchText(e.target.value);
	};
	const handleChangePage = (event, newPage) => {
		setPage(newPage);
	};
	const handleChangeRowsPerPage = (event) => {
		setRowsPerPage(parseInt(event.target.value, 10));
		setPage(0);
	};

	const handleRequestSort = (event, property) => {
		const isAsc = orderBy === property && order === 'asc';
		setOrder(isAsc ? 'desc' : 'asc');
		setOrderBy(property);
	};
	// Descending
	function descendingComparator(a, b, orderBy) {
		if (b[orderBy] < a[orderBy]) {
			return -1;
		}
		if (b[orderBy] > a[orderBy]) {
			return 1;
		}
		return 0;
	}

	// Comparator
	function getComparator(order, orderBy) {
		return order === 'desc'
			? (a, b) => descendingComparator(a, b, orderBy)
			: (a, b) => -descendingComparator(a, b, orderBy);
	}

	// Stable Sort
	function stableSort(array, comparator) {
		const stabilizedThis = array.map((el, index) => [el, index]);
		stabilizedThis.sort((a, b) => {
			const order = comparator(a[0], b[0]);
			if (order !== 0) {
				return order;
			}
			return a[1] - b[1];
		});
		return stabilizedThis.map((el) => el[0]);
	}

	useEffect(() => {
		setData([]);
		axios.get(`${url}?q=${searchText}`).then((res) => {
			setData(res.data.data);
		});
	}, [searchText, refresh]);
	console.log(
		'Dataaa Slice  ',
		data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage),
	);
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
								// sortDirection={orderBy === item.label ? order : false}
							>
								<Typography color='textSecondary' variant='h6'>
									{item.label}
								</Typography>
							</TableCell>
						))}
					</TableRow>
				</TableHead>
				<TableBody>
					{data
						.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
						.map((item) => (
							<TableRow
								hover
								tabIndex={-1}
								key={item.name}
								onClick={() => handleRowClick(item)}
							>
								{col.map((cl) => (
									<TableCell
										key={cl.name}
										width={cl.width || '20%'}
										align={cl.align || 'left'}
									>
										{cl?.render ? cl.render(item) : item[cl.name] || '-'}
									</TableCell>
								))}
							</TableRow>
						))}
				</TableBody>
			</Table>

			<TablePagination
				rowsPerPageOptions={[5, 10, 25]}
				component='div'
				count={data.length}
				rowsPerPage={rowsPerPage}
				page={page}
				onPageChange={handleChangePage}
				onRowsPerPageChange={handleChangeRowsPerPage}
			/>
		</BaseCard>
	);
}
