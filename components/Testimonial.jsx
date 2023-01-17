import React, { Component, useEffect, useState } from 'react';

import HeadingComponent from './Heading';
import Image from 'next/image';
import Slider from 'react-slick';
import axios from 'axios';
import styles from '../styles/Home.module.scss';

function TestimonialComponent() {
	const [data, setData] = useState([]);

	useEffect(() => {
		axios
			.get('/api/testimonials')
			.then((res) => {
				console.log(res.data.data);
				setData(res.data.data);
			})
			.catch((err) => {
				console.log(err);
			});
	}, []);

	const settings = {
		dots: true,
		infinite: true,
		speed: 500,
		// autoplay: true,
		arrows: false,
		slidesToShow: 1,
		slidesToScroll: 1,
	};

	return (
		<div className={styles.container}>
			<HeadingComponent
				heading='Testimonial'
				subHeading='What Our'
				subBoldHeading='Client Says'
			/>
			<div className={styles.testimonialWrapper}>
				<Slider {...settings}>
					{data.map((item, idx) => (
						<div key={item} className={styles.testimonialImageWrapper}>
							{/* <Image
								src={`/components/Testimonial-BG.jpg`}
								width='1080px'
								height='450px'
								// layout='fill'
								// layout='responsive'
								// objectFit='contain'
								alt='pro'
								className='img-responsive'
							/> */}
							<div className={styles.testimonialText}>
								<p className={styles.description}>{item.description}</p>
								<p className={styles.name}>{item.name}</p>
								<p className={styles.ceoFounder}>{item.designation}</p>
								{/* <FontAwesomeIcon icon={faQuoteLeft} /> */}
							</div>
						</div>
					))}
				</Slider>
				<br />
				<br />
			</div>
		</div>
	);
}

export default TestimonialComponent;
