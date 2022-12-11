import { Col, Row } from 'reactstrap';

import ContainerComponent from '../container';
import HeadingComponent from '../Heading';
import Image from 'next/image';
import styles from '../../styles/why-zes.module.scss';

export default function EventManagementSolutions() {
	return (
		<section
			data-aos='fade-right'
			data-aos-delay='500'
			style={{ minHeight: '500px' }}
		>
			{/* <ContainerComponent> */}{' '}
			<Row className={styles.eventManagementSolutionsWrapper}>
				<Col style={{ padding: '0px' }} className={styles.image}>
					<div className={styles.styleDivider}></div>

					<Image
						src='/whyzes/Why-ZeS- Sec-2.jpg'
						width={'664px'}
						alt='dsa'
						height='541px'
					/>
				</Col>
				<Col xs={12} md={12} className={styles.eventManagementData}>
					<div className={styles.dataWrapper}>
						<p className={styles.heading}>Why ZES</p>
						<p className={styles.subHeading}>
							Events <span>Management Solutions</span>
						</p>
						<br />
						<p className={styles.description}>
							The Zes Beauty Club is home to a number of different party and
							athletic facilities, all of which are available for rental for a
							range of different events, including weddings, camps, and
							concerts. People who are interested in using the club&#39;s
							facilities may anticipate receiving high-quality support from the
							department of Events Management. We will do everything in our
							ability to make the process of organising, organising, and booking
							your event as simple as possible, and we are delighted to take you
							on a tour of the beautiful facilities that we have available at
							our Zes club.
						</p>
					</div>
				</Col>
			</Row>
			{/* </ContainerComponent> */}
			<br />
			<br />
			<br />
			<br />
			<br />
			<br />
			<br />
			<br />
		</section>
	);
}
