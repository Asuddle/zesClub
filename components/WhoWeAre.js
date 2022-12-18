import { Col, Row } from 'reactstrap';

import Image from 'next/image';
import styles from '../styles/About.module.scss';
import { useRouter } from 'next/router';

function WhoWeAre() {
	const router = useRouter();
	const handleJoin = () => {
		router.push('/register');
	};
	return (
		<section
			className={styles.whoWeAre}
			data-aos='fade-right'
			data-aos-delay='500'
		>
			<div className='container'>
				<Row className='mb-3 position-relative'>
					<Col md={12} sm={12} lg={6}>
						<div className={styles.upperDivider}></div>
						<div className={styles.dataWrapper}>
							<p className={styles.heading}>Who we are</p>
							<p className={styles.subHeading}>
								Few <span>Words About ZeS</span>
							</p>
							<br />
							<p className={styles.description}>
								ZeS has been started with the intention of establishing a
								community service organization that would make people's everyday
								lives easier. We at ZeS want to improve not only your day-to-day
								life but also your professional and personal lives, as well as
								your health, fitness, and physical attractiveness, in order to
								make you happier and less stressed out in general. This includes
								all aspects of your life, including your health, fitness, and
								physical appearance.
							</p>
							<p className={styles.description}>
								We are working hard to make your life easier so that you may
								kick back, relax, and enjoy yourself both with the people you
								care about and on your own time; we are certain that our efforts
								will be well worth it. The lofty purpose that we have set for
								ourselves is to offer you with the skills that you need to be
								tranquil and joyful no matter what life throws at you, and to
								enable you to become a gift to others around you by making some
								simple but substantial alterations to your routine and attitude
								on life.
							</p>
							<br />
							<br />
							<button onClick={handleJoin} className={styles.aboutZesButton}>
								Join Now
							</button>
							<br />
						</div>
					</Col>
					<Col md={12} sm={12} lg={6} className={styles.imagePortion}>
						<div className={styles.parent}>
							<div className={styles.designDivider}></div>
							<Image
								className={styles.image1}
								width={460}
								height={400}
								alt='image-1'
								src='/about/aboutimg0.jpeg'
							/>
							<div className={styles.smallImageWrapper}>
								<Image
									className={styles.image2}
									width={280}
									height={280}
									alt='image-2'
									src='/about/aboutimg2.jpg'
								/>
							</div>
						</div>
					</Col>
				</Row>
			</div>
		</section>
	);
}

export default WhoWeAre;
