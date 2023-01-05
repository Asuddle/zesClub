import { Col, Row } from 'reactstrap';
import { useEffect, useState } from 'react';

import ContainerComponent from '../container';
import EventCard from './eventCard';
import HeadingComponent from '../Heading';
import Image from 'next/image';
import axios from 'axios';
import styles from '../../styles/WhatNext.module.scss';

export default function WhatNextComponent() {
	const [data, setData] = useState([]);

	useEffect(() => {
		axios.get('/api/events').then((res) => {
			let dt = res.data.data;
			setData(dt);
		});
	}, []);

	return (
		<div className={styles.galleryWrapper}>
			<ContainerComponent>
				<br />
				<br />
				<HeadingComponent
					heading='Upcoming Events'
					subBoldHeading='Awesome Events'
					subHeading='Latest'
				/>
				<Row className='text-center' style={{ padding: '16px' }}>
					{data.map((item, idx) => (
						<EventCard key={item} item={item} idx={idx} />
					))}
				</Row>
			</ContainerComponent>
		</div>
	);
}
