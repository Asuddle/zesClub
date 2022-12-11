import { Col, Row } from 'reactstrap';

import EventCard from './WhatNext/eventCard';
import GalleryCard from './Gallery/GalleryCard';
import HeadingComponent from './Heading';
import Image from 'next/image';
import styles from '../styles/Home.module.scss';
import { useState } from 'react';

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
					{galleryArr.map((item, idx) => (
						<Col xs={12} sm={12} md={4} key={idx}>
							<GalleryCard key={idx} item={item} idx={idx} />
						</Col>
					))}
				</Row>
				<br />
				<br />
				<br />
				<br />
				<br />
				<div class='text-center'>
					<button className={styles.viewAllGalleryBtn}>View All Event</button>
				</div>
				{/* <button className={styles.aboutZesButton}>View All Events</button> */}
			</div>
		</div>
	);
}
