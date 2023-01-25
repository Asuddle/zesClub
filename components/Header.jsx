import { Button, Col, Row } from 'reactstrap';
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
import { useRouter } from 'next/router';

function Header({
	title = 'We Are Zes',
	member = '2500+',
	members = 'MEMBERS',
	isSmall = true,
	subHeading = '',
}) {
	const router = useRouter();
	const handleRegister = () => {
		router.push('/register');
	};
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
					{subHeading !== '' && (
						<p
							className={styles.headerSubHeading}
							data-aos='fade-up'
							data-aos-delay='500'
						>
							{subHeading}
						</p>
					)}
				</Col>
				<Col md={1}>
					<div
						className={styles.socialIcons}
						style={{ marginTop: isSmall ? '150px' : '200px' }}
					>
						<FontAwesomeIcon
							icon={faFacebookF}
							onClick={() => {
								window.open('https://www.facebook.com/groups/zesbeautyclub');
							}}
						/>
						<br />
						<FontAwesomeIcon
							icon={faInstagram}
							onClick={() => {
								window.open(
									'https://www.instagram.com/zesbeautyclub?r=nametag',
								);
							}}
						/>
						<br />
						<FontAwesomeIcon
							icon={faLinkedinIn}
							onClick={() => {
								window.open('https://www.linkedin.com/in/zuyyanazaidi');
							}}
						/>
						<br />
						<FontAwesomeIcon
							icon={faYoutube}
							onClick={() => {
								window.open(
									'https://www.youtube.com/channel/UCVjP6Z61_FTdugAxwa96Qdg',
								);
							}}
						/>
						<br />
						<FontAwesomeIcon
							icon={faTwitter}
							onClick={() => {
								window.open(
									'https://twitter.com/ZeS_Club?t=pPOLZSnzlLfoRMwUfQbRvw&s=09',
								);
							}}
						/>
						<div className={styles.verticalDivider}></div>
						<Button
							onClick={handleRegister}
							className={styles.becomeMemberButton}
						>
							Become Member
						</Button>
					</div>
				</Col>
			</Row>
		</div>
	);
}

export default Header;
