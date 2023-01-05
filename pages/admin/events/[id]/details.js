import DetailComponent from '../../../../components/details';
const data1 = [
	{ name: 'image', label: 'Image' },
	{ name: 'name', label: 'Name' },
	{ name: 'description', label: 'Description' },
	{ name: 'price', label: 'Price' },
	{ name: 'audience', label: 'Audience' },
	{ name: 'date', label: 'Date' },
	{ name: 'venue', label: 'Venue' },
];

export default function EventDetails() {
	return (
		<DetailComponent
			url='/api/events'
			dataObj={data1}
			images={['image']}
			title='Event Details'
		/>
	);
}
