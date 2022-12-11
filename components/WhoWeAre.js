import { Col, Row } from 'reactstrap';

import Image from 'next/image';
import styles from '../styles/About.module.scss';

function WhoWeAre() {
	return (
		<section
			className={styles.whoWeAre}
			data-aos='fade-right'
			data-aos-delay='500'
		>
			<div className='container'>
				<Row className='mb-3 position-relative'>
					<Col md={12} sm={12} lg={6}>
						<div className={styles.upperDivider}></div>
						<div className={styles.dataWrapper}>
							<p className={styles.heading}>Who we are</p>
							<p className={styles.subHeading}>
								Few <span>Words About ZeS</span>
							</p>
							<br />
							<p className={styles.description}>
								The Zes Beauty organic cosmetics collection is certified to
								satisfy stringent organic standards and does not include any
								chemicals or preservatives. Using these products, you may be
								able to achieve skin that is more radiant and young. When
								developing our cosmetics, we take into consideration your
								individual preferences regarding skin type and other factors. We
								provide a wide variety of products for purchase, including
								facial massage creams, bath bombs, face oils, lip scrubs, lip
								balms, and lip scrubs. Nevertheless, with Zes Beauty, the beauty
								salon travels to the customer.
							</p>
							<p className={styles.description}>
								A salon that focuses on making clients feel pampered by
								providing services such as massage, facials, body cleanses, hair
								styling, henna tattoos, acrylic nails, and eyelash extensions,
								among other beauty enhancements.
							</p>
							<br />
							<br />
							<button className={styles.aboutZesButton}>Join Now</button>
							<br />
						</div>
					</Col>
					<Col md={12} sm={12} lg={6} className={styles.imagePortion}>
						<div className={styles.parent}>
							<div className={styles.designDivider}></div>
							<Image
								className={styles.image1}
								width={460}
								height={500}
								alt='image-1'
								src='/about/aboutimg1.jpg'
							/>
							<div className={styles.smallImageWrapper}>
								<Image
									className={styles.image2}
									width={280}
									height={280}
									alt='image-2'
									src='/about/aboutimg2.jpg'
								/>
							</div>
						</div>
					</Col>
				</Row>
			</div>
		</section>
	);
}

export default WhoWeAre;
