import 'bootstrap/dist/css/bootstrap.min.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import 'aos/dist/aos.css';

import AOS from 'aos';
import { Button } from 'reactstrap';
import ContactForm from '../components/contact';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Footer from '../components/Footer';
import GoogleMap from '../components/Map';
import Head from 'next/head';
import Header from '../components/Header';
import HeadingComponent from '../components/Heading';
import Image from 'next/image';
import Navigation from '../components/Navigation';
import ProjectsComponent from '../components/Projects';
import PromotionBanner from '../components/PromotionBanner';
import ReadyBanner from '../components/ReadyBanner';
import ServiceComponent from '../components/Services';
import SubHeader from '../components/SubHeader';
import TestimonialComponent from '../components/Testimonial';
import UpcomingEvents from '../components/UpcomingEvents';
import WhyZES from '../components/WhyZES';
import styles from '../styles/Home.module.scss';
import { useEffect } from 'react';

export default function Home() {
	useEffect(() => {
		AOS.init();
		// fetchTodos();
	}, []);
	// AOS.init({ duration: 1000 });

	return (
		<div>
			<Head>
				<title>Zes</title>
				<meta name='description' content='Generated by create next app' />
				<link rel='icon' href='/favicon.ico' />
			</Head>
			<Navigation />
			<Header isSmall={false} />
			<SubHeader />
			<UpcomingEvents />

			<WhyZES />
			<ReadyBanner />
			<ServiceComponent />
			<ProjectsComponent />
			{/*  */}
			<PromotionBanner />
			<TestimonialComponent />
			<HeadingComponent
				heading='Enquiry'
				subHeading='We would like to listen'
				subBoldHeading='from you'
			/>
			<ContactForm />
			<GoogleMap />
			<Footer />
		</div>
	);
}