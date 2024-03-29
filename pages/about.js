import 'bootstrap/dist/css/bootstrap.min.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import 'aos/dist/aos.css';

import * as Scroll from 'react-scroll';

import {
	Button,
	Element,
	Events,
	Link,
	animateScroll as scroll,
	scrollSpy,
	scroller,
} from 'react-scroll';
import React, { useEffect } from 'react';

import AOS from 'aos';
import CEOMessage from '../components/About/CEOMessage';
import ContactForm from '../components/contact';
import Footer from '../components/Footer';
import FounderMessage from '../components/About/FounderMessage';
import GoogleMap from '../components/Map';
import Head from 'next/head';
import Header from '../components/Header';
import HeadingComponent from '../components/Heading';
import LegalConsultant from '../components/About/LegalConsultant';
import Navigation from '../components/Navigation';
import ReadyBanner from '../components/ReadyBanner';
import SubHeader from '../components/SubHeader';
import VisionMissionComponent from '../components/About/VisionMission';
import WhoWeAre from '../components/WhoWeAre';
import ZesClubComponent from '../components/About/ZesClub';
import ZesEvents from '../components/About/ZesEvents';
import { useRouter } from 'next/router';

function AboutPage() {
	const router = useRouter();
	useEffect(() => {
		AOS.init();
		if (router.query && router.query.section) {
			scroller.scrollTo(router.query.section, {
				duration: 500,
				smooth: true,
				offset: -70,
			});
		}
	}, []);

	return (
		<div>
			<Head>
				<title>Zes</title>
				<meta name='description' content='Generated by create next app' />
				<link rel='icon' href='/favicon.ico' />
			</Head>
			<Navigation />
			<Header
				title='About ZeS'
				member=''
				members=''
				subHeading='How we serve you'
			/>
			<WhoWeAre />
			<Element name='beauty'>
				<VisionMissionComponent />
			</Element>
			<Element name='club'>
				<ZesClubComponent />
			</Element>
			<Element name='events'>
				<ZesEvents />
			</Element>
			{/* <CEOMessage /> */}
			<FounderMessage />
			<LegalConsultant />
			<ReadyBanner />
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

export default AboutPage;
