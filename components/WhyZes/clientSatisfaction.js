import { Col, Row } from 'reactstrap';

import ContainerComponent from '../container';
import Image from 'next/image';
import styles from '../../styles/why-zes.module.scss';

export default function ClientSatisfaction() {
	return (
		<ContainerComponent>
			<div className={styles.clientSatisfaction}>
				<Row>
					<Col md={6} className={styles.dataPortion}>
						<div className={styles.dataWrapper}>
							<div className={styles.verticalDivider}></div>
							<p className={styles.heading}>THRIVING ON</p>
							<p className={styles.subHeading}>
								Client <span>Satisfaction</span>
							</p>
							<p className={styles.description}>
								Zuyyana Zaidi, the company&#39;s founder and current CEO, has
								also been working tirelessly on a brand-new project for the Zes
								Beauty Club in anticipation of the relaunch of Feed Your Beauty.
								We can&#39;t wait to give you the whole story and share all the
								details with you.
							</p>
						</div>
					</Col>
					<Col
						style={{ padding: '0px' }}
						md={6}
						className={styles.imagePortion}
					>
						<Image
							src='/whyzes/Why-ZeS--Sec-3.jpg'
							width='100%'
							height='100%'
							alt='client'
							layout='responsive'
						/>
					</Col>
				</Row>
			</div>
		</ContainerComponent>
	);
}
