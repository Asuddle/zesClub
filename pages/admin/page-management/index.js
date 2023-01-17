import AboutUs from '../../../components/admin/page-management/AboutUs';
import BaseCard from '../../../components/baseCard/BaseCard';
import Box from '@mui/material/Box';
import HomePage from '../../../components/admin/page-management/Homepage';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import WhyZesForm from '../../../components/admin/page-management/WhyZes';
import axios from 'axios';
import { useEffect } from 'react';
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
				{value === index && <Box sx={{ p: 2 }}>{children}</Box>}
			</div>
		);
	}

	const [value, setValue] = useState(0);
	const [data, setData] = useState({});

	useEffect(() => {
		axios
			.get('/api/pages')
			.then((res) => {
				console.log(res.data.data[0]);
				setData(res.data.data[0]);
			})
			.catch((err) => {
				console.log(err);
			});
	}, []);

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
					<Tab label='Why Zes' />
				</Tabs>
				<TabPanel value={value} index={0}>
					<HomePage defaultValues={data} />
				</TabPanel>
				<TabPanel value={value} index={1}>
					<AboutUs defaultValues={data} />
				</TabPanel>
				<TabPanel value={value} index={2}>
					<WhyZesForm defaultValues={data} />
				</TabPanel>
			</Box>
		</BaseCard>
	);
}
