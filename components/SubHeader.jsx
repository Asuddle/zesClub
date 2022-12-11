import { Col, Row } from 'reactstrap';

import Image from 'next/image';
import styles from '../styles/Home.module.scss';

export default function SubHeader() {
	return (
		<div className={styles.container}>
			<Row className={styles.subHeaderWrapper}>
				<Col xs={3} className={styles.subHeaderHeading}>
					ZES Group
				</Col>
				<Col xs={9} style={{ marginTop: '12px' }}>
					<Row>
						{[1, 3, 4, 2].map((item) => (
							<Col key={item}>
								<Image
									alt='log'
									src={`/ZeS${item}.jpg`}
									width={100}
									height={100}
								/>
							</Col>
						))}
					</Row>
				</Col>
			</Row>
		</div>
	);
}
