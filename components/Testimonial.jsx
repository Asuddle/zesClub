import React, { Component } from 'react';
import { faQuoteLeft, faQuoteLeftAlt } from '@fortawesome/free-solid-svg-icons';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import HeadingComponent from './Heading';
import Image from 'next/image';
import Slider from 'react-slick';
import styles from '../styles/Home.module.scss';

function TestimonialComponent() {
	const settings = {
		dots: true,
		infinite: true,
		speed: 500,
		// autoplay: true,
		arrows: false,
		slidesToShow: 1,
		slidesToScroll: 1,
	};
	const height = 500;
	const width = 1280;
	return (
		<div className={styles.container}>
			<HeadingComponent
				heading='Testimonial'
				subHeading='We have'
				subBoldHeading='Best Clients'
			/>
			<div className={styles.testimonialWrapper}>
				<Slider {...settings}>
					{[1, 2, 3].map((item, idx) => (
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
								<p className={styles.description}>
									Eighty one percent of our clientele have trust in Zes beauty
									Club as their go-to beauty provider. There is no easy solution
									or one-size-fits-all strategy for establishing credibility in
									a professional setting. After all, &#34;strong conviction in
									the dependability, truth, capability, or power of another
									person, group, organization, or object&#34; is how the word
									&#34;trust&#34; is defined in the Oxford English Dictionary.
									Because dependability serves as the cornerstone around which
									trust is constructed, it is imperative that your firm make it
									a top priority to provide outstanding value to its clients at
									all times.
								</p>
								<p className={styles.name}>Name here</p>
								<p className={styles.ceoFounder}>CEO Founder</p>
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
