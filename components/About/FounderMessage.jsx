import { Col, Row } from 'reactstrap';
import {
	faFacebookF,
	faInstagram,
	faLinkedinIn,
	faTwitter,
} from '@fortawesome/free-brands-svg-icons';

import ContainerComponent from '../container';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Image from 'next/image';
import styles from '../../styles/About.module.scss';

export default function FounderMessage() {
	return (
		<section
			className={styles.founderMessageWrapper}
			style={{ background: 'white' }}
		>
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
									<FontAwesomeIcon
										icon={faFacebookF}
										onClick={() =>
											window.open('https://www.facebook.com/zuyyana.zaidi')
										}
									/>
									<FontAwesomeIcon
										icon={faInstagram}
										onClick={() =>
											window.open('https://instagram.com/zuyyanazaidi')
										}
									/>
									<FontAwesomeIcon
										icon={faTwitter}
										onClick={() =>
											window.open(
												'https://twitter.com/Zuyyana_Zaidi?t=6sBMgDlO1j4UsmFW1ZAr6g&s=09',
											)
										}
									/>
									<FontAwesomeIcon
										icon={faLinkedinIn}
										onClick={() =>
											window.open('https://www.linkedin.com/in/zuyyanazaidi')
										}
									/>
								</div>
							</div>
						</Col>
						<Col md={6}>
							<p className={styles.founderHeading}>Zuyyana Zaidi</p>
							<p>Zes Founder</p>
							<p className={styles.founderMessageHeading}>
								Message from founder
							</p>
							<p className={styles.description} style={{ paddingRight: '8%' }}>
								Having spent over a decade in the corporate world, I have had
								plenty of opportunity to reflect on my own and others'
								maturation as people. What is it, precisely, that leaves us
								feeling discontent? This question keeps popping into my head:
								<strong>
									{' '}
									What causes us to always feel so far from one another?
								</strong>
								Most of us aren't really happy on the inside, despite our
								propensity for hilarity. Given that there is no objective
								hierarchy in the universe, why do males and females feel the
								need to constantly prove their superiority to one another? These
								questions sparked new phases of my life, which ultimately led to
								a dramatic alteration in my core identity. It's important for
								everyone to be aware of these things; they've helped me preserve
								my own sense of joy and calm. I've made some changes to my
								habits and discovered ways to keep the happiness and calm inside
								me. ZeS is dedicated to helping individuals from all walks of
								life become the most successful versions of themselves. My
								primary motivation for improving myself is the desire to provide
								joy to other people. Since of this, I do everything I can to
								make other people happy, because I know that's the only way,
								I'll ever be truly content with my own life
								{/* CEO and inventor Zuyyana Zaidi has been busy with the launching
								of Feed Your Beauty and a major Zes beauty club project.
								There&apos s a lot of blood and guts to be spilled, and we
								can&apost wait to tell you about it. In the meanwhile, we
								recommend that you join the social scene at the Zes Club. Please
								invite your closest female friends, sisters, mothers, roommates,
								coworkers, and anyone else you think might enjoy hearing our
								message to the campaign&aposs beauty club and parties by
								forwarding this email to them. Those women and girls who know
								and appreciate their own worth and beauty are invited to find
								out more about the Zes Beauty Club and our forthcoming events. */}
							</p>
						</Col>
					</Row>
				</div>
			</ContainerComponent>
		</section>
	);
}
