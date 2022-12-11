import { Col, Row } from 'reactstrap';
import {
	faFacebook,
	faFacebookF,
	faInstagram,
	faLinkedinIn,
	faSnapchat,
	faSnapchatGhost,
	faSquareSnapchat,
	faTwitter,
	faWhatsapp,
	faYoutube,
} from '@fortawesome/free-brands-svg-icons';

import ContainerComponent from '../container';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Image from 'next/image';
import styles from '../../styles/About.module.scss';

export default function FounderMessage() {
	return (
		<section className={styles.founderMessageWrapper}>
			<ContainerComponent container='smallContainer'>
				<div className={styles.founderMessage}>
					<Row className={styles.internalFounderRow}>
						<Col md={6} className={styles.founderImage}>
							<Image
								src='/about/Zuyyana-Zaidi.png'
								width={400}
								height={400}
								style={{ borderRadius: '14px' }}
								alt='founder'
							/>
							<div className={styles.socialMedia}>
								<div style={{ textAlign: 'center', padding: '17px 0px' }}>
									<FontAwesomeIcon icon={faFacebookF} />
									<FontAwesomeIcon icon={faInstagram} />
									<FontAwesomeIcon icon={faTwitter} />
									<FontAwesomeIcon icon={faLinkedinIn} />
								</div>
							</div>
						</Col>
						<Col md={6}>
							<p className={styles.founderHeading}>Zuyyana Zaidi</p>
							<p>Zes Founder</p>
							<p className={styles.founderMessageHeading}>
								Message from founder
							</p>
							<p className={styles.description} style={{ paddingRight: '20%' }}>
								CEO and inventor Zuyyana Zaidi has been busy with the launching
								of Feed Your Beauty and a major Zes beauty club project.
								There&apos s a lot of blood and guts to be spilled, and we
								can&apost wait to tell you about it. In the meanwhile, we
								recommend that you join the social scene at the Zes Club. Please
								invite your closest female friends, sisters, mothers, roommates,
								coworkers, and anyone else you think might enjoy hearing our
								message to the campaign&aposs beauty club and parties by
								forwarding this email to them. Those women and girls who know
								and appreciate their own worth and beauty are invited to find
								out more about the Zes Beauty Club and our forthcoming events.
							</p>
						</Col>
					</Row>
				</div>
			</ContainerComponent>
		</section>
	);
}
