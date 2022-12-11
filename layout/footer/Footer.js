import { Box, Typography } from '@mui/material';

import Link from 'next/link';
import React from 'react';

const Footer = () => {
	return (
		<Box sx={{ p: 3, textAlign: 'center' }}>
			<Typography>
				© 2022 All rights reserved by <a>ZesClub</a>
			</Typography>
		</Box>
	);
};

export default Footer;
