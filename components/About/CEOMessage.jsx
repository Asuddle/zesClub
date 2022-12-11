import { Col, Row } from 'reactstrap';

import ContainerComponent from '../container';
import Image from 'next/image';
import styles from '../../styles/About.module.scss';

export default function CEOMessage() {
	return (
		<section className={styles.ceoMessageWrapper}>
			<ContainerComponent>
				<Row className={styles.ceoMessage}>
					<Col md={4} className={styles.dataPortion}>
						<p className={styles.ceoName}>Name Here</p>
						<p>Designation Here</p>
						<p className={styles.ceoWhoWeAre}>
							Who we are? <br />
							Creative <br />
							visionaries...
						</p>
					</Col>
					<Col md={8} className={styles.imagePortion}>
						<Image
							src='/ceo.jpg'
							alt='ceo'
							// width='100%'
							// height='100%'
							layout='fill'
							// layout='responsive'
						/>
						<div className={styles.ceoMessage}>
							<p className={styles.heading}>Message from CEO</p>
							<p className={styles.description}>
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
						</div>
					</Col>
				</Row>
			</ContainerComponent>
		</section>
	);
}
