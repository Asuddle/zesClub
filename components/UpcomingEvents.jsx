import { Col, Row } from 'reactstrap';
import { useEffect, useState } from 'react';

import EventCard from './WhatNext/eventCard';
import GalleryCard from './Gallery/GalleryCard';
import HeadingComponent from './Heading';
import Image from 'next/image';
import axios from 'axios';
import styles from '../styles/Home.module.scss';
import { useRouter } from 'next/router';

const galleryArr = [
	{
		name: 'Launch Party',
		imageCount: 6,
		date: '14th september 2021',
		folder: '1',
	},
	{
		name: 'Past life regression therapy',
		imageCount: 25,
		date: '22nd march 2022',
		folder: '2',
	},
	{
		name: 'Second Party',
		imageCount: 25,
		date: '16th october 2021',
		folder: '3',
	},
];
export default function UpcomingEvents() {
	const [data, setData] = useState([]);
	const router = useRouter();
	const handleEvents = () => {
		router.push('/what-next');
	};
	useEffect(() => {
		axios.get('/api/events').then((res) => {
			let dt = res.data.data;
			dt.length = 3;
			setData(dt);
		});
	}, []);
	return (
		<div
			className='space-ptb bg-dark-half-md'
			style={{ marginBottom: '60px' }}
			// data-aos='fade-up'
		>
			<div className='container'>
				<HeadingComponent
					heading='upcoming Events'
					subHeading='Latest'
					subBoldHeading='Awesome Events'
				/>
				<Row className={styles.eventImage} data-aos='fade-up'>
					{data.map((item, idx) => (
						<Col xs={12} sm={12} md={4} key={idx}>
							<GalleryCard key={idx} item={item} idx={idx} />
						</Col>
					))}
				</Row>
				<div class='text-center'>
					<button className={styles.viewAllGalleryBtn} onClick={handleEvents}>
						View All Event
					</button>
				</div>
				{/* <button className={styles.aboutZesButton}>View All Events</button> */}
			</div>
		</div>
	);
}
