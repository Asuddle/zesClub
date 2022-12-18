import 'bootstrap/dist/css/bootstrap.min.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import 'aos/dist/aos.css';

import AOS from 'aos';
import { Card } from 'reactstrap';
import ContactForm from '../components/contact';
import ContainerComponent from '../components/container';
import Footer from '../components/Footer';
import Head from 'next/head';
import Header from '../components/Header';
import Navigation from '../components/Navigation';
import React from 'react';
import ReadyBanner from '../components/ReadyBanner';

export default function ContactPage() {
	return (
		<div>
			<Head>
				<title>Zes</title>
				<meta name='description' content='Generated by create next app' />
				<link rel='icon' href='/favicon.ico' />
			</Head>
			<Navigation />
			<Header title='Contact' member='' members='' />
			<br />
			<br />
			<br />
			<ContactForm />
			<ReadyBanner />
			<Footer />
		</div>
	);
}
