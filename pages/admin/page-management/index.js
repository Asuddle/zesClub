import AboutUs from '../../../components/admin/page-management/AboutUs';
import BaseCard from '../../../components/baseCard/BaseCard';
import Box from '@mui/material/Box';
import Contact from '../../../components/admin/page-management/Contact';
import Gallery from '../../../components/admin/page-management/Gallery';
import HomePage from '../../../components/admin/page-management/Homepage';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Typography from '@mui/material/Typography';
import WhyZES from '../../../components/admin/page-management/WhyZes';
import { useState } from 'react';

export default function PageManagement() {
	function TabPanel(props) {
		const { children, value, index, ...other } = props;

		return (
			<div
				role='tabpanel'
				hidden={value !== index}
				id={`vertical-tabpanel-${index}`}
				aria-labelledby={`vertical-tab-${index}`}
				{...other}
			>
				{value === index && (
					<Box sx={{ p: 2 }}>
						<Typography>{children}</Typography>
					</Box>
				)}
			</div>
		);
	}
	const [value, setValue] = useState(0);

	const handleChange = (event, newValue) => {
		setValue(newValue);
	};
	return (
		<BaseCard title='Page Management'>
			<Box
				sx={{
					flexGrow: 1,
					bgcolor: 'background.paper',
					display: 'flex',
					minHeight: '400px',
				}}
			>
				<Tabs
					orientation='vertical'
					value={value}
					onChange={handleChange}
					sx={{ borderRight: 1, borderColor: 'divider', paddingTop: '20px' }}
				>
					<Tab label='Home Page' />
					<Tab label='About Us' />
					<Tab label='Promotion' />
					<Tab label='Gallery' />
					<Tab label='What Next' />
					<Tab label='Enquiry Form' />
					<Tab label='Contact Us' />
				</Tabs>
				<TabPanel value={value} index={0}>
					<HomePage />
				</TabPanel>
				<TabPanel value={value} index={1}>
					<AboutUs />s
				</TabPanel>
				<TabPanel value={value} index={2}>
					Item Three
				</TabPanel>
				<TabPanel value={value} index={3}>
					<Gallery />
				</TabPanel>
				<TabPanel value={value} index={4}>
					<WhyZES />
				</TabPanel>
				<TabPanel value={value} index={5}>
					Item Six
				</TabPanel>
				<TabPanel value={value} index={6}>
					<Contact />
				</TabPanel>
			</Box>
		</BaseCard>
	);
}
