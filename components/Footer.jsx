import { Col, Row } from 'reactstrap';
import {
	faFacebookF,
	faInstagram,
	faLinkedin,
	faSnapchat,
	faTwitter,
	faWhatsapp,
	faYoutube,
} from '@fortawesome/free-brands-svg-icons';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Image from 'next/image';
import { ProjectImageComponent } from './Image';
import { faCircleChevronRight } from '@fortawesome/free-solid-svg-icons';
import styles from '../styles/Home.module.scss';
import { useRouter } from 'next/router';

const linkArr = [
	{ name: 'Home', href: '/' },
	{ name: 'About ZeS', href: '/about' },
	{ name: 'Why ZeS', href: '/why-zes' },
	{ name: 'Interests', href: '/interests' },
	{ name: 'Registration', href: '/register' },
	{ name: 'Contact Us', href: '/contact' },
	{ name: 'FAQs', href: '/faq' },
];
const galleryImages = [
	{
		title: 'Project Title',
		largeImage: '/home/Gallery1.jpg',
		smallImage: '/home/Gallery1.jpg',
	},
	{
		title: 'Project Title',
		largeImage: '/home/Gallery2.jpg',
		smallImage: '/home/Gallery2.jpg',
	},
	{
		title: 'Project Title',
		largeImage: '/home/Gallery3.jpg',
		smallImage: '/home/Gallery3.jpg',
	},
	{
		title: 'Project Title',
		largeImage: '/home/Gallery4.jpg',
		smallImage: '/home/Gallery4.jpg',
	},
	{
		title: 'Project Title',
		largeImage: '/service-4.jpg',
		smallImage: '/service-4.jpg',
	},
	{
		title: 'Project Title',
		largeImage: '/service-5.jpg',
		smallImage: '/service-5.jpg',
	},
];

export default function Footer() {
	const router = useRouter();
	return (
		<div>
			<footer className={styles.footer}>
				<div
					className='container-fluid text-light footer py-4 wow fadeIn'
					// style={{ paddingBottom: '8px' }}
					// style='background:#282828'
					data-wow-delay='0.1s'
				>
					<div className='container py-5'>
						<Row>
							<Col lg={5} md={6} className={styles.footerDescriptionWrapper}>
								<Image
									src='/zes2-black.png'
									alt='logo'
									width={100}
									height={100}
								/>
								<br />
								<br />
								<p className={styles.footerDescription}>
									ZeS has been started with the intention of establishing a
									community service organization that would make people's
									everyday lives easier. We at ZeS want to improve not only your
									day-to-day life but also your professional and personal lives,
									as well as your health, fitness, and physical attractiveness.{' '}
								</p>
								<br />
								<p className={styles.footerHeading}>Follow Us</p>
								<FontAwesomeIcon
									icon={faTwitter}
									onClick={() => {
										window.open(
											'https://twitter.com/ZeS_Club?t=pPOLZSnzlLfoRMwUfQbRvw&s=09',
										);
									}}
								/>

								<FontAwesomeIcon
									onClick={() => {
										window.open(
											'https://www.facebook.com/groups/zesbeautyclub',
										);
									}}
									icon={faFacebookF}
								/>
								<FontAwesomeIcon icon={faWhatsapp} />
								<FontAwesomeIcon
									icon={faLinkedin}
									onClick={() => {
										window.open('https://www.linkedin.com/in/zuyyanazaidi');
									}}
								/>
								<FontAwesomeIcon
									icon={faYoutube}
									onClick={() => {
										window.open(
											'https://www.youtube.com/channel/UCVjP6Z61_FTdugAxwa96Qdg',
										);
									}}
								/>
								<FontAwesomeIcon
									icon={faInstagram}
									onClick={() => {
										window.open(
											'https://www.instagram.com/zesbeautyclub?r=nametag',
										);
									}}
								/>
								<br />
								<br />
							</Col>
							<Col lg={3} md={6}>
								<p className={styles.footerHeading}>Quick Links</p>
								{linkArr.map((item) => (
									<div key={item.name} className={styles.footerLink}>
										<div
											className='btn btn-link mb-3'
											href=''
											onClick={() => router.push(item.href)}
										>
											<FontAwesomeIcon icon={faCircleChevronRight} />
											<span>{item.name}</span>{' '}
										</div>
									</div>
								))}
							</Col>
							<Col xs={12} lg={4} md={12}>
								<p className={styles.footerHeading}>ZeS Gallery</p>
								<Row noGutters>
									{galleryImages.map((item) => (
										<Col xs={6} sm={4} md={4} lg={4} key={item.largeImage}>
											<ProjectImageComponent
												key={item.largeImage}
												title={item.title}
												largeImage={item.largeImage}
												smallImage={item.smallImage}
											/>
										</Col>
									))}
								</Row>
							</Col>
						</Row>
					</div>
				</div>
			</footer>
			<div
				className='container-fluid copyright py-4'
				style={{ background: '#2e2e2e', color: 'white' }}
			>
				{/* opyrights Reserved © 2022 ZeS Group */}
				<div className='container'>
					<Row className={styles.privacyPolicy}>
						<div className='col-md-6 text-center text-md-start mb-3 mb-md-0'>
							Copyrights Reserved &copy; 2022 ZeS Group
						</div>
						<div className='col-md-6 text-center text-md-end'>
							Privacy Policy | Term & Conditions
						</div>
					</Row>
				</div>
			</div>
		</div>
	);
}
