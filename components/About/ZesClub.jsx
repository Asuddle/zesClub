import { Col, Row } from 'reactstrap';

import ContainerComponent from '../container';
import Image from 'next/image';
import styles from '../../styles/About.module.scss';

export default function ZesClubComponent() {
	return (
		<section
			className={styles.whoWeAre}
			data-aos='fade-right'
			data-aos-delay='500'
		>
			<ContainerComponent>
				<div className='container'>
					<Row className='mb-3 position-relative'>
						<Col md={12} sm={12} lg={5}>
							<div className={styles.dataWrapper}>
								<br />
								<br />
								<p className={styles.subHeading}>
									ZeS <span>Club</span>
								</p>
								<p className={styles.aboutHeading}>FOR COUPLES ONLY</p>

								<p className={styles.description}>
									Only couples are allowed to join ZeS Club, and its primary
									purpose is to encourage the development of relationships that
									are not only healthier and more successful but also more
									original and creative. As we go about our daily lives
									together, we've both observed that the excitement that first
									surrounded our relationship has, at times, begun to wane. In
									addition, none of this is dependent on the socioeconomic
									position of the staff members, as if it were unimportant
									whether or not you come from an affluent home or not. <br />{' '}
									We had high hopes that by encouraging you to take part in a
									variety of events, get-togethers, and games focused on
									fostering cooperation, we would be able to contribute to
									making your partnership more desirable and strengthening its
									foundation. As a result of this fact, you and the person you
									care about may get even greater pleasure from the fact that
									you are living a happy live together.
								</p>
							</div>
						</Col>
						<Col md={12} sm={12} lg={7} className={styles.imagePortion}>
							<div className={styles.parentZesClub}>
								<div className={styles.zesClubDivider}></div>
								<Image
									className={styles.image1}
									alt='image-1'
									width={520}
									height={500}
									// layout='responsive'
									src='/about/aboutimg3.jpg'
								/>
							</div>
						</Col>
					</Row>
				</div>
			</ContainerComponent>
		</section>
	);
}
