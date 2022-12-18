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
							ZeS Events is a well-regarded event planning business situated in
							Dubai that offers a comprehensive selection of event-related
							services. The happiness of all those who participated in your
							event is our primary concern, and we work hard to achieve this
							goal. We are not the kind of people to take risks, so you can be
							guaranteed that the party will be planned and decorated exactly as
							you have asked, and that your guests will be amazed and amused
							from the minute they set foot inside the event. Since we are the
							ones in control of the big picture, it is our responsibility to
							ensure that your visitors have the best time possible and that
							everything works smoothly from the very beginning to the very end.
							You may be certain that we will ensure the same level of
							spectacular success for your company event as we have for every
							other business gathering we have ever organized.
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
