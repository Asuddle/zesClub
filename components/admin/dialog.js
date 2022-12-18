import * as React from 'react';

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import FeatherIcon from 'feather-icons-react';

export default function ModalComponent({ open, toggle, handleDelete }) {
	return (
		<div>
			<Dialog
				open={open}
				onClose={toggle}
				// fullWidth
				style={{ padding: '24px' }}
				aria-labelledby='alert-dialog-title'
				aria-describedby='alert-dialog-description'
			>
				<div style={{ textAlign: 'center', paddingTop: '24px' }}>
					<FeatherIcon icon='x-circle' size='150px' stroke='#E45A68' />
				</div>
				<DialogTitle id='alert-dialog-title'>
					<strong>Are you sure you want to Delete?</strong>
				</DialogTitle>
				<DialogActions
					className='text-center'
					style={{ justifyContent: 'center' }}
				>
					<Button color='error' variant='contained' onClick={handleDelete}>
						Delete
					</Button>
					<Button onClick={toggle} variant='outlined' color='primary'>
						Cancel
					</Button>
				</DialogActions>
			</Dialog>
		</div>
	);
}
