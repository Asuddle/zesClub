import { EditorState, convertFromRaw } from 'draft-js';

import HeadingComponent from './Heading';
import Image from 'next/image';
import Slider from 'react-slick';
import axios from 'axios';
import { stateToHTML } from 'draft-js-export-html';
import styles from '../styles/Home.module.scss';
import { useEffect } from 'react';
import { useState } from 'react';

const serviceArray = [
	{
		title: 'Corporate Events',
		image: '/home/Service1.jpg',
		description: [
			'Team Building Events',
			'Conferences',
			'Recruiting Events',
			'Product Launches',
			'Networking Events',
			'Seminars',
			'Trade Shows/Expos',
			'Corporate Dinners',
			'Shareholder / Corporate Board Meetings',
			'Year-End Functions/parties',
			'Workshops/courses',
			'Charity events',
		],
	},
	{
		title: 'Personal events and parties',
		image: '/home/Service2.jpg',
		description: [
			'Birthday Parties',
			'Engagement Parties',
			'Themed Celebrations* Hens &amp; Bucks Parties',
			'Baby showers',
			'Family Events',
			'VIP Events',
			'Community Events',
		],
	},
	{
		title: 'Celebrity Functions and Award Ceremonies',
		image: '/home/Service3.jpg',
		description: [
			'National Music Awards',
			'Local and National Business Awards',
			'National Film Awards',
			'Concerts',
			'Choral Music concert',
			'Band Concert',
			'Opera Concert',
		],
	},
	{
		title: 'Festivals',
		image: '/home/Service4.jpg',
		description: [
			'Music,Film,Art Community celebrations',
			'City Festivals',
			'Road Shows',
			'Theme Events',
			'Fire Work',
		],
	},
	{
		title: 'Wedding',
		image: '/home/Service5.jpg',
		description: [
			'We help guide their clients every step of the way when it comes to designing, planning, and executing their dream wedding.',
		],
	},
];

const handleDescription = (description) => {
	const contentState = convertFromRaw(JSON.parse(description));
	const editorState = EditorState.createWithContent(contentState);
	const st = stateToHTML(editorState.getCurrentContent());
	return st;
};
export default function ServiceComponent() {
	const [data, setData] = useState([]);
	useEffect(() => {
		axios.get('/api/services').then((res) => {
			console.log(res.data.data);
			setData(res.data.data);
		});
	}, []);
	const settings = {
		dots: true,
		infinite: true,
		speed: 500,
		slidesToShow: data.length >= 3 ? 3 : data.length,
		slidesToScroll: 15,
		arrows: false,
		autoplay: true,
		responsive: [
			{
				breakpoint: 1024,
				settings: {
					slidesToShow: 3,
					slidesToScroll: 3,
					infinite: true,
					dots: true,
				},
			},
			{
				breakpoint: 600,
				settings: {
					slidesToShow: 2,
					slidesToScroll: 2,
					initialSlide: 2,
				},
			},
			{
				breakpoint: 480,
				settings: {
					slidesToShow: 1,
					slidesToScroll: 1,
				},
			},
		],
	};
	return (
		<div
			className={styles.serviceWrapper}
			data-aos='fade-right'
			data-aos-delay='500'
		>
			<div className={styles.container}>
				<HeadingComponent
					heading='Our Services'
					subHeading='Professional'
					subBoldHeading='Experties'
				/>
				{data.length > 0 && (
					<Slider {...settings}>
						{data.map((item, idx) => (
							<div key={item.title}>
								<div className={styles.imageContainer}>
									<Image
										className='img-fluid'
										src={`/${item.image}`}
										alt=''
										// layout='responsive'
										width='400'
										height='400'
										// objectFit='contain'
									/>
									<button href='#' className={styles.serviceButton}>
										{item.title}
										{/* <ul>
											{item.description.map((item) => (
												<li key={item}>{item}</li>
											))}
										</ul> */}
										<div
											dangerouslySetInnerHTML={{
												__html: handleDescription(item.description),
											}}
										></div>
									</button>
								</div>
							</div>
						))}
					</Slider>
				)}
			</div>
		</div>
	);
}
