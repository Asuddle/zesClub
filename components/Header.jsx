import { Col, Row } from 'reactstrap';
import {
	faFacebook,
	faFacebookF,
	faInstagram,
	faLinkedinIn,
	faTwitter,
	faYoutube,
} from '@fortawesome/free-brands-svg-icons';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Navigation from './Navigation';
import { fab } from '@fortawesome/free-brands-svg-icons';
import styles from '../styles/Home.module.scss';

function Header({
	title = 'We Are Zes',
	member = '2500+',
	members = 'MEMBERS',
	isSmall = true,
}) {
	return (
		<div className={isSmall ? styles.smallBannerWrapper : styles.bannerWrapper}>
			{/* <Navigation /> */}
			<Row className={styles.container}>
				<Col md={11} className={styles.siteData}>
					<p
						className={styles.weZes}
						data-aos='fade-right'
						data-aos-delay='500'
					>
						{title}
					</p>
					<p
						className={styles.totalMember}
						data-aos='fade-up-left'
						data-aos-delay='500'
					>
						{member}
					</p>
					<p className={styles.member} data-aos='fade-up' data-aos-delay='500'>
						{members}
					</p>
				</Col>
				<Col md={1}>
					<div
						className={styles.socialIcons}
						style={{ marginTop: isSmall ? '150px' : '200px' }}
					>
						<FontAwesomeIcon icon={faFacebookF} />
						<br />
						<FontAwesomeIcon icon={faInstagram} />
						<br />
						<FontAwesomeIcon icon={faLinkedinIn} />
						<br />
						<FontAwesomeIcon icon={faYoutube} />
						<br />
						<FontAwesomeIcon icon={faTwitter} />
						<div className={styles.verticalDivider}></div>
					</div>
				</Col>
			</Row>
		</div>
	);
}

export default Header;
