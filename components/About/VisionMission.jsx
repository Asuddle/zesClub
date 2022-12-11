import { Col, Row } from 'reactstrap';

import ContainerComponent from '../container';
import Image from 'next/image';
import styles from '../../styles/About.module.scss';

export default function VisionMissionComponent() {
	return (
		<section
			className={styles.visionMissionWrapper}
			data-aos='fade-right'
			data-aos-delay='500'
		>
			<ContainerComponent>
				<Row>
					<Col sm={12} md={12} lg={7} className={styles.imageWrap}>
						<div className={styles.horizontalWrapper}></div>

						<Image
							src='/about/Section-02.jpg'
							layout='responsive'
							width={750}
							alt='people'
							height={400}
						/>
						<div className={styles.imageText}>
							We have ability to organize events to inspire and attract
						</div>
					</Col>
					<Col
						md={12}
						lg={5}
						className={styles.dataWrapper}
						style={{ paddingLeft: '5%' }}
					>
						<div className={styles.headingWrapper}>
							<p className={styles.heading}>VISION & MISSION</p>
							<p className={styles.subHeading}>
								ZeS <span>Events Management</span>
							</p>
						</div>
						<p className={styles.description} style={{ paddingRight: '5%' }}>
							Events of all kinds may find a suitable home at the Zes Beauty
							Club, which is equipped with several recreational and social
							amenities. Festivals, camps, and concerts are all good examples.
							Events Management is dedicated to providing first-rate service to
							anybody interested in renting a nightclub. We&#39;re thrilled to
							show you around our beautiful Zes club, and we&#39;ll do all in
							our power to make planning and scheduling your event as simple and
							stress-free as possible.
						</p>
						<br />
						<button>Enquire Now</button>
					</Col>
				</Row>
			</ContainerComponent>
		</section>
	);
}
