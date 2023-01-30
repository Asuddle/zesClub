import { Col, Row } from 'reactstrap';

// import ParticleAnimation from 'react-particle-animation';
// import Particles from 'react-tsparticles';
import styles from '../styles/Home.module.scss';
import { useRouter } from 'next/router';

function ReadyBanner() {
	const router = useRouter();
	const handleRoute = () => {
		router.push('/register');
	};
	return (
		<>
			<div className={styles.readyBannerWrapper}>
				{/* <Canvas options={sample1} /> */}

				<div className={styles.mediumContainer}>
					<div>
						<Row
							facts
							my-
							bg-gradient
							className='container facts justify-content-center '
							style={{ padding: '48px 0px' }}
						>
							<Col md={8} sm={12}>
								<p className={styles.headerName}>
									Join Zes <span>to get Promotion</span>{' '}
								</p>

								<p className={styles.captionPara}>
									By signing in, you can avail Amazing Offers from renown brands
									exclusively for ZeS Beauty Club members.
								</p>
								<br />
							</Col>
							<Col md={4} sm={12} style={{ marginTop: '32px' }}>
								<button onClick={handleRoute}>CLICK NOW!</button>
							</Col>
						</Row>
					</div>
				</div>
			</div>
		</>
	);
}

export default ReadyBanner;
