import 'aos/dist/aos.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import AOS from 'aos';
import ContactForm from '../components/contact';
import Footer from '../components/Footer';
import GoogleMap from '../components/Map';
import Head from 'next/head';
import Header from '../components/Header';
import HeadingComponent from '../components/Heading';
import Navigation from '../components/Navigation';
import ReadyBanner from '../components/ReadyBanner';
import WhatNextComponent from '../components/WhatNext';
import { useEffect } from 'react';

export default function WhatNext() {
	useEffect(() => {
		AOS.init();
	}, []);
	return (
		<div>
			<Head>
				<title>Zes</title>
				<meta name='description' content='Generated by create next app' />
				<link rel='icon' href='/favicon.ico' />
			</Head>
			<Navigation />

			<Header title='What Next' member='' members='' />
			<WhatNextComponent />
			<ReadyBanner />
			<GoogleMap />
			<HeadingComponent
				heading='Enquiry'
				subHeading='We would like to listen'
				subBoldHeading='from you'
			/>
			<ContactForm />
			<Footer />
		</div>
	);
}
