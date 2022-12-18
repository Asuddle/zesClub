import { Col, Row } from 'reactstrap';

import ContainerComponent from '../container';
import Image from 'next/image';
import styles from '../../styles/About.module.scss';

export default function VisionMissionComponent() {
	return (
		<section
			className={styles.visionMissionWrapper}
			data-aos='fade-right'
			data-aos-delay='500'
		>
			<div className='container'>
				<Row>
					<Col sm={12} md={12} lg={12} xl={7} className={styles.imageWrap}>
						<Image
							src='/about/Section-02.jpg'
							layout='responsive'
							width={700}
							alt='people'
							height={450}
						/>
						<div className={styles.horizontalWrapper}></div>
						<div className={styles.imageText}>
							We have ability to organize events to inspire and attract
						</div>
					</Col>
					<Col
						md={12}
						lg={12}
						xl={5}
						className={styles.dataWrapper}
						style={{ paddingLeft: '5%' }}
					>
						<div className={styles.headingWrapper}>
							<p className={styles.subHeading}>
								ZeS <span>Beauty Club</span>
							</p>
							<p className={styles.aboutHeading}>For Ladies Only</p>
						</div>

						<p className={styles.description} style={{ paddingRight: '5%' }}>
							The ZeS Beauty Club was established with the intention of making
							women feel as if they have a place in the world and are capable of
							doing whatever they put their minds to. ZeS Beauty Club is looking
							for stunning and powerful women who can maintain their beautiful
							looks and have their wits about them. If this sounds like you,
							please apply. Where,
							<ul>
								<li>The aspect of ZEN known as "calmness and equilibrium."</li>
								<li>
									The beauty that radiates from each and every woman is her
									innate ELEGANCE.
								</li>
								<li>
									We move, modify, and adapt without any breaks or interruptions
									because SEAMLESSNESS permeates every aspect of our existence
									as women
								</li>
							</ul>
							When a member of the ZeS Beauty Club, a woman does not have to
							worry about being punished for expressing her views or pursuing
							her passions since the club provides an environment free from
							hostility. The proverb "Your network is your net worth" is
							something that each and every person has been exposed to at some
							point in their lives. The ZeS Beauty Club was created with the
							intention of fostering meaningful connections among its members
							and harnessing the strength that comes from members cooperating
							with one another. When we work together, our combined strength is
							greater than the sum of each of our individual strengths. “We're
							not just girls; we're members of ZeS….”
						</p>
					</Col>
				</Row>
			</div>
		</section>
	);
}
