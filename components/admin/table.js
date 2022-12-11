import {
	Box,
	Button,
	Chip,
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableRow,
	Typography,
} from '@mui/material';

import BaseCard from '../baseCard/BaseCard';

export default function TableComponent({
	col,
	data,
	title = 'User Management',
	handleRowClick = () => {},
}) {
	return (
		<BaseCard title={title}>
			<Table
				aria-label='table'
				sx={{
					mt: 3,
					whiteSpace: 'nowrap',
				}}
			>
				<TableHead>
					<TableRow>
						{col.map((item) => (
							<TableCell key={item.label}>
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
							console.log(item, cl);
							arr.push(
								<TableCell key={item.id} align={cl.align || 'left'}>
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
			</Table>
		</BaseCard>
	);
}
// (
//         <TableRow key={item.id}>
//                 <TableCell>
//                         <Typography
//                                 sx={{
//                                         fontSize: '15px',
//                                         fontWeight: '500',
//                                 }}
//                         >
//                                 {item.id}
//                         </Typography>
//                 </TableCell>
//                 <TableCell>
//                         <Typography
//                                 sx={{
//                                         fontSize: '15px',
//                                         fontWeight: '500',
//                                 }}
//                         >
//                                 {item.firstName} {item.lastName}
//                         </Typography>
//                 </TableCell>
//                 <TableCell>
//                         <Box
//                                 sx={{
//                                         display: 'flex',
//                                         alignItems: 'center',
//                                 }}
//                         >
//                                 <Box>
//                                         <Typography
//                                                 variant='h6'
//                                                 sx={{
//                                                         fontWeight: '600',
//                                                 }}
//                                         >
//                                                 {item.email}
//                                         </Typography>
//                                         <Typography
//                                                 color='textSecondary'
//                                                 sx={{
//                                                         fontSize: '13px',
//                                                 }}
//                                         >
//                                                 {item.role}
//                                         </Typography>
//                                 </Box>
//                         </Box>
//                 </TableCell>
//                 <TableCell>
//                         <Typography color='textSecondary' variant='h6'>
//                                 {item.mobile}
//                         </Typography>
//                 </TableCell>
//                 <TableCell>
//                         {!item.isVerified ? (
//                                 <Button
//                                         variant='contained'
//                                         color='primary'
//                                         onClick={() => verifyUser(item.user_id)}
//                                 >
//                                         Verify User
//                                 </Button>
//                         ) : (
//                                 <Typography>Verified</Typography>
//                         )}
//                 </TableCell>
//         </TableRow>
// )
