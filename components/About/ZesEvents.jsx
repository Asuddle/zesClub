import { Col, Row } from 'reactstrap';

import ContainerComponent from '../container';
import Image from 'next/image';
import styles from '../../styles/About.module.scss';

export default function ZesEvents() {
	return (
		<section
			className={styles.visionMissionWrapper}
			data-aos='fade-right'
			data-aos-delay='500'
		>
			<ContainerComponent>
				<div className='containerdsdsf'>
					<Row style={{ justifyContent: 'space-around' }}>
						<Col
							sm={12}
							md={12}
							lg={12}
							xl={7}
							className={styles.imageWrap}
							style={{ textAlign: 'center', paddingLeft: '40px' }}
						>
							<div className={styles.zesEventWrapper}></div>

							<Image
								src='/about/aboutimg4.jpg'
								// layou	t='responsive'
								width={630}
								alt='people'
								height={401}
							/>
						</Col>
						<Col md={12} lg={12} xl={5} className={styles.dataWrapper}>
							<div
								style={{
									maxWidth: '450px',
									marginLeft: 'auto',
									marginRight: 'auto',
								}}
							>
								<div className={styles.headingWrapper}>
									<br />
									<br />
									<p className={styles.subHeading}>
										ZeS <span>Events</span>
									</p>
									<p className={styles.aboutHeading}>ALL ABOUT HOSPITALITY</p>
								</div>
								<p
									className={styles.description}
									style={{
										paddingRight: '5%',
									}}
								>
									ZeS Events is a well-regarded event planning business situated
									in Dubai that offers a comprehensive selection of
									event-related services. The happiness of all those who
									participated in your event is our primary concern, and we work
									hard to achieve this goal. We are not the kind of people to
									take risks, so you can be guaranteed that the party will be
									planned and decorated exactly as you have asked, and that your
									guests will be amazed and amused from the minute they set foot
									inside the event. Since we are the ones in control of the big
									picture, it is our responsibility to ensure that your visitors
									have the best time possible and that everything works smoothly
									from the very beginning to the very end. You may be certain
									that we will ensure the same level of spectacular success for
									your company event as we have for every other business
									gathering we have ever organized.
								</p>
							</div>
						</Col>
					</Row>
				</div>
			</ContainerComponent>
		</section>
	);
}
