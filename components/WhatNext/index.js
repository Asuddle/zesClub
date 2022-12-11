import { Col, Row } from 'reactstrap';

import ContainerComponent from '../container';
import EventCard from './eventCard';
import HeadingComponent from '../Heading';
import Image from 'next/image';
import styles from '../../styles/WhatNext.module.scss';

export default function WhatNextComponent() {
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
					{[1, 2, 3, 4, 5].map((item, idx) => (
						<EventCard key={item} item={item} idx={idx} />
					))}
				</Row>
			</ContainerComponent>
		</div>
	);
}
