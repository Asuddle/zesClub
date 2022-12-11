import DailyActivity from '../../components/dashboard/DailyActivity';
import { Grid } from '@mui/material';
import ProductPerfomance from '../../components/dashboard/ProductPerfomance';
import SalesOverview from '../../components/dashboard/SalesOverview';

export default function Index() {
	return (
		<Grid container spacing={0}>
			<Grid item xs={12} lg={12}>
				<SalesOverview />
			</Grid>
			{/* ------------------------- row 1 ------------------------- */}
			<Grid item xs={12} lg={12}>
				<DailyActivity />
			</Grid>
			<Grid item xs={12} lg={12}>
				<ProductPerfomance />
			</Grid>
		</Grid>
	);
}
