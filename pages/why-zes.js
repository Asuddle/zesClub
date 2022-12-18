import 'bootstrap/dist/css/bootstrap.min.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import ClientSatisfaction from '../components/WhyZes/clientSatisfaction';
import ContactForm from '../components/contact';
import EventManagementSolutions from '../components/WhyZes/eventManagementSolutions';
import Footer from '../components/Footer';
import GoogleMap from '../components/Map';
import Head from 'next/head';
import Header from '../components/Header';
import HeadingComponent from '../components/Heading';
import LifeWithWithoutZes from '../components/WhyZes/index';
import Navigation from '../components/Navigation';
import ReadyBanner from '../components/ReadyBanner';
import TestimonialComponent from '../components/Testimonial';

export default function WhyZes() {
	return (
		<div>
			<Head>
				<title>Zes</title>
				<meta name='description' content='Generated by create next app' />
				<link rel='icon' href='/favicon.ico' />
			</Head>
			<Navigation />
			<Header
				title='Why Zes'
				member=''
				members=''
				subHeading='Lets be unique'
			/>
			<LifeWithWithoutZes />
			<EventManagementSolutions />
			<ClientSatisfaction />
			<ReadyBanner />
			<TestimonialComponent />
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
