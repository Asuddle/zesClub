import styles from '../../styles/About.module.scss';
export default function LifeWithWithoutZes() {
	return (
		<section
			className={styles.whoWeAre}
			style={{ padding: '80px 0px' }}
			data-aos='fade-right'
			data-aos-delay='500'
		>
			<div className='container'>
				<div className='row mb-3 position-relative'>
					<div className='col-sm-12 col-md-12 col-lg-6'>
						<div className={styles.upperDivider}></div>
						<br />
						<br />
						<div className={styles.dataWrapper}>
							<p className={styles.subHeading}>
								Life <span>with Zes</span>
							</p>
							<br />
							<p className={styles.description}>
								The Zes Club was founded to give women the self-assurance they
								need to pursue their passions and make the most of their life.
								Women who want to join the Zes Club must first meet strict
								criteria, including physical attractiveness, confidence, and the
								capacity to alter their outward appearance by the power of their
								own minds.
							</p>
							<p className={styles.description}>
								Women who are members of the Zes Club get a sense of confidence
								that frees them to be themselves and follow their interests
								without fear of ridicule from their peers. This is because the
								ladies know they can count on the support of their club sisters
								in times of need. This amazing organization promotes
								member-to-member connection in an effort to put the adage
								&quot;Your network is your net worth&quot; into action. We can
								all recognize the proverb and agree that it has some truth.
								Together, we are stronger than any one organization. And we also
								think of ourselves as being of the Zes.
							</p>
						</div>
					</div>
					<div className='col-sm-12 col-md-12 col-lg-6'>
						<div className={styles.upperDivider}></div>
						<br />
						<br />
						<div className={styles.dataWrapper}>
							<p className={styles.subHeading}>
								Life <span>without ZeS</span>
							</p>
							<br />
							<p className={styles.description}>
								People who have developed immunity to the Zes Club we advocate
								will continue to exist, but they will never know the full
								splendor of life. The lack of Zes Club in a person&#39;s life is
								analogous to a flower bereft of fragrance, a bird bereft of the
								ability to fly, an ocean bereft of water, and a night sky bereft
								of stars. If you don&#39;t allow the experience of all the
								beauty that is all around you to fill your spirit with
								happiness, life will become a dry and onerous existence
							</p>
							<br />
							<br />
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
