import 'bootstrap/dist/css/bootstrap.min.css';

import Head from 'next/head';
import Navigation from '../../components/Navigation';
import UserProfileComponent from '../../components/users/profile';
import VerticalTab from '../../components/verticalTab';

export default function UserProfile() {
	return (
		<div>
			<Head>
				<title>Zes</title>
				<meta name='description' content='Generated by create next app' />
				<link rel='icon' href='/favicon.ico' />
			</Head>
			<Navigation />
			<div>
				<VerticalTab>
					<UserProfileComponent />
				</VerticalTab>
			</div>
			{/* <Footer /> */}
		</div>
	);
}
