import DetailComponent from '../../../../components/details';
const data1 = [
	{ name: 'title', label: 'Title' },
	{ name: 'firstName', label: 'First Name' },
	{ name: 'lastName', label: 'Last Name' },
	{ name: 'email', label: 'Email' },
	{ name: 'enquiryType', label: 'Enquiry Type' },
	{ name: 'message', label: 'Message' },
	{ name: 'createdDate', label: 'Created At' },
];

export default function EnquiryDetails() {
	return (
		<DetailComponent
			url='/api/enquiry'
			dataObj={data1}
			images={[]}
			heading='firstName'
			title='Enquiry Details'
		/>
	);
}
