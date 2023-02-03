import { Col, Row } from 'reactstrap';
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
							<Row className={styles.testimonialText}>
								<Col md={12} lg={4} style={{ textAlign: 'center' }}>
									<img
										src={item.image}
										style={{
											width: '265px',
											height: '300px',
											marginLeft: 'auto',
											marginRight: 'auto',
										}}
										width={300}
										height={300}
									/>
									<p className={styles.name}>{item.name}</p>
									<p className={styles.ceoFounder}>{item.designation}</p>
								</Col>
								<Col md={12} lg={8}>
									<p className={styles.description}>{item.description}</p>
								</Col>
								{/* <p className={styles.description}>{item.description}</p>
								<p className={styles.name}>{item.name}</p>
								<p className={styles.ceoFounder}>{item.designation}</p> */}
							</Row>
						</div>
					))}
				</Slider>
				<br />
				<br />
				<br />
				<br />
				<br />
			</div>
		</div>
	);
}

export default TestimonialComponent;
