import { useEffect, useState } from 'react';

import BaseCard from '../../../../components/baseCard/BaseCard';
import DetailComponent from '../../../../components/details';
import Image from 'next/image';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { Typography } from '@mui/material';
import axios from 'axios';
import { useRouter } from 'next/router';

export default function UserDetails() {
	const data1 = [
		{ name: 'title', label: 'Title' },
		{ name: 'photo', label: 'Profile Photo' },
		{ name: 'firstName', label: 'First Name' },
		{ name: 'middleName', label: 'Middle Name' },
		{ name: 'lastName', label: 'Last Name' },
		{ name: 'mobile', label: 'Mobile Number' },
		{ name: 'email', label: 'Email' },
		{ name: 'country', label: 'Country' },
		{ name: 'city', label: 'Emirates City' },
		{ name: 'nationality', label: 'Nationality' },
		{ name: 'profession', label: 'Profession' },
		{ name: 'emiratesID', label: 'EmiratesId' },
		{ name: 'website', label: 'Website' },
		{ name: 'hobbies', label: 'Hobbies' },
		{ name: 'height', label: 'Height' },
		{ name: 'age', label: 'Age' },
		{ name: 'weight', label: 'Weight' },
		{ name: 'expectations', label: 'Expectations' },
		{ name: 'makeHappy', label: 'What makes you happy?' },
		{ name: 'spouse_title', label: 'Spouse Title' },
		{ name: 'spouse_firstName', label: 'Spouse FirstName' },
		{ name: 'spouse_middleName', label: 'Spouse MiddleName' },
		{ name: 'spouse_lastName', label: 'Spouse LastName' },
		{ name: 'spouse_mobile', label: 'Spouse Mobile Number' },
		{ name: 'spouse_country', label: 'Spouse Country' },
		{ name: 'spouse_city', label: 'Spouse City' },
		{ name: 'spouse_nationality', label: 'Spouse Nationality' },
		{ name: 'spouse_profession', label: 'Spouse Profession' },
		{ name: 'spouse_emiratesID', label: 'Spouse EmiratesId' },
	];

	return (
		<div>
			<DetailComponent
				url='/api/users'
				dataObj={data1}
				images={['photo']}
				title='Admin User Details'
				heading='firstName'
			/>
		</div>
	);
}
