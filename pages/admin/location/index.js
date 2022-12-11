import { Button, Typography } from '@mui/material';

import Autocomplete from 'react-google-autocomplete';
import BaseCard from '../../../components/baseCard/BaseCard';
import GoogleMap from '../../../components/Map';
import { Input } from 'reactstrap';

export default function Location() {
	return (
		<BaseCard>
			<Typography variant='h2'>Location</Typography>

			<div style={{ padding: '40px' }}>
				<Autocomplete
					apiKey={'AIzaSyB3MvC6-cmk3z2SRDL5DTjakqqWZ2ETToM'}
					style={{ width: '100%', height: '49px', padding: '2px' }}
					onPlaceSelected={(place) => {
						console.log(place);
					}}
					options={{
						types: ['(regions)'],
						componentRestrictions: { country: 'ru' },
					}}
					defaultValue='Clover Bay Tower'
				/>
				<br />
				<br />
				<GoogleMap />
				<br />
				<br />
				<div>
					<Button variant='contained' size='lg' color='success'>
						Save
					</Button>
				</div>
			</div>
		</BaseCard>
	);
}
