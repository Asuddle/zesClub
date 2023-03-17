import * as React from 'react';

import { Button, Grid } from '@mui/material';

import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import { handleLogout } from '../Navigation';
import styles from '../../styles/user.module.scss';
import { useRouter } from 'next/router';
import { useState } from 'react';

export default function SmallMenu() {
	const router = useRouter();

	return (
		<React.Fragment>
			<Grid container spacing={2} className={styles.smallMenu}>
				<Grid item xs={12}>
					<Button
						className={
							router.route === '/user/profile'
								? styles.smallMenuNavSelected
								: styles.smallMenuNav
						}
						onClick={() => {
							router.push('/user/profile');
						}}
					>
						Profile
					</Button>
				</Grid>
				<Grid item xs={12}>
					<Button
						className={
							router.route === '/user/events'
								? styles.smallMenuNavSelected
								: styles.smallMenuNav
						}
						onClick={() => {
							router.push('/user/events');
						}}
					>
						Dashboard
					</Button>
				</Grid>
				<Grid item xs={12}>
					<Button
						onClick={() => {
							router.push('/user/bookings');
						}}
						className={
							router.route === '/user/bookings'
								? styles.smallMenuNavSelected
								: styles.smallMenuNav
						}
					>
						Bookings
					</Button>
				</Grid>
				<Grid item xs={12}>
					<Button className={styles.smallMenuNav} onClick={handleLogout}>
						Logout
					</Button>
				</Grid>
			</Grid>
			<br />
			<br />
			<br />
		</React.Fragment>
	);
}
