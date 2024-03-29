import 'bootstrap/dist/css/bootstrap.min.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import 'aos/dist/aos.css';

import Footer from '../components/Footer';
import Head from 'next/head';
import Header from '../components/Header';
import HeadingComponent from '../components/Heading';
import Navigation from '../components/Navigation';
import RegisterForm from '../components/Register/form';

export default function Register() {
	return (
		<div>
			<div>
				<Head>
					<title>Zes</title>
					<meta name='description' content='Generated by create next app' />
					<link rel='icon' href='/favicon.ico' />
				</Head>
				<Navigation />

				<Header
					title='Register'
					member=''
					members=''
					subHeading='Join our family'
				/>
				<HeadingComponent
					heading='BECOME A MEMBER'
					subHeading='Let’s'
					subBoldHeading='Connect with ZeS'
				/>
				<RegisterForm />
				<Footer />
			</div>
		</div>
	);
}
