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

export default function LegalConsultant() {
	return (
		<section className={styles.founderMessageWrapper}>
			<ContainerComponent container='mediumContainer'>
				<div className={styles.founderMessage}>
					<Row className={styles.internalFounderRow}>
						<Col md={6} style={{ textAlign: 'left' }}>
							<p className={styles.founderHeading}>Mr. Mohamad Shalaby</p>
							<p>Owner MSH Legal Services Dubai & MSH Advocates Egypt</p>

							<p className={styles.founderMessageHeading}>
								ZeS Club Legal Consultant
							</p>
							<p className={styles.description} style={{ paddingRight: '0px' }}>
								Experienced Senior Business Partner with a demonstrated history
								of working in the legal services industry. Skilled in
								International Law, Alternative Dispute Resolution, Banking Law,
								Trademarks, and Litigation Support. Strong consulting
								professional with a Bachelor of Laws (LL.B.) focused in Faculty
								of Law, Public Law & Master from Faculty of Law & Zagazig
								University & Egypt.
							</p>
							<p className={styles.legalConsultantRole}>General Manager:</p>
							<p className={styles.legalHeading}>
								H.H Shaekh ADEL Alqasemi Law Firm
							</p>
							<p className={styles.legalConsultantRole}>Senior Consultant:</p>

							<p className={styles.legalHeading}>
								Shaekh ADEL Alqasemi Law Firm
							</p>
							<p className={styles.legalConsultantRole}>
								Business partner& Senior Consultant:
							</p>

							<p className={styles.legalHeading}>
								H.H Shaekh ADEL Alqasemi Law Firm
							</p>

							<p className={styles.legalConsultantRole}>Head of Litigation:</p>
							<p className={styles.legalHeading}>
								Alhadad and Associate Law Firm
							</p>
						</Col>
						<Col md={6} className={styles.founderImage}>
							<Image
								src='/lawyer-img.jpg'
								width={400}
								height={450}
								style={{ borderRadius: '14px' }}
								alt='lawyer'
							/>
						</Col>
					</Row>
				</div>
			</ContainerComponent>
		</section>
	);
}
