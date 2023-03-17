import RegisterForm from '../../../components/Register/form';
import axios from 'axios';
import { useRouter } from 'next/router';

export default function AddAdminUser({ role = 'admin' }) {
	const router = useRouter();
	const customOnSubmit = (data, fileInput, passportInput, emiratesIdInput) => {
		const formData = new FormData();

		let result = {
			...data,
			...{
				title: data.title.value,
				interest: data.interest.value,
				city: data.city.value,
				haveOwnBusiness: 0,
				photo: fileInput,
				role,
				country: data.country.value,
				emiratesIdFile: emiratesIdInput,
				nationality: data.nationality.value,
				spouse_title: data.spouse_title?.value || '',
				spouse_city: data.spouse_city?.value || '',
				spouse_country: data.spouse_country?.value || '',
			},
		};
		console.log(result);
		for (const key in result) {
			formData.append(key, result[key]);
		}
		const config = {
			headers: { 'content-type': 'multipart/form-data' },
		};
		axios
			.post('/api/auth', formData, config)
			.then((res) => {
				if (role == 'admin') {
					router.push('/admin/admin-user');
				} else {
					router.push('/admin/user');
				}
			})
			.catch((err) => {
				console.log(err);
			});
	};
	return (
		<div>
			<RegisterForm onCustomSubmit={customOnSubmit} />
		</div>
	);
}
