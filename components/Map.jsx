// import GoogleMapReact from 'google-map-react';

function GoogleMap() {
	return (
		// <GoogleMapReact
		// 	bootstrapURLKeys={{ key: 'AIzaSyCk5lR1dYABB3_g7oB3vqF2lfs_EGDQzYc' }}
		// 	defaultCenter={defaultProps.center}
		// 	defaultZoom={defaultProps.zoom}
		// ></GoogleMapReact>
		<iframe
			src='https://maps.google.com/maps?q=Clover+Bay+Tower+-+6a+Marasi+Dr+-+Business+Bay+-+Dubai+-+United+Arab+Emirates&t=&z=13&ie=UTF8&iwloc=&output=embed'
			style={{ border: '0', width: '100%', height: '480px' }}
			title='map'
			loading='lazy'
			allowFullScreen
		></iframe>
	);
}

export default GoogleMap;
