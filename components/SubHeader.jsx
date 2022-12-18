import { Col, Row } from 'reactstrap';

import Image from 'next/image';
import styles from '../styles/Home.module.scss';
import { useRouter } from 'next/router';

export default function SubHeader() {
	const router = useRouter();
	const handleClick = (q) => {
		if (q) {
			router.push(`/about?section=${q}`);
		}
	};
	const subArr = [
		{ q: 'beauty', count: 1 },
		{ q: 'club', count: 3 },
		{ q: 'events', count: 4 },
		// { q: '', count: 2 },
	];
	return (
		<div className={styles.container}>
			<Row className={styles.subHeaderWrapper}>
				<Col xs={3} className={styles.subHeaderHeading}>
					ZES Group
				</Col>
				<Col xs={9} style={{ marginTop: '12px' }}>
					<Row>
						{subArr.map((item) => (
							<Col key={item.count}>
								<Image
									style={{ cursor: 'pointer' }}
									alt='log'
									onClick={() => handleClick(item.q)}
									src={`/ZeS${item.count}.jpg`}
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
