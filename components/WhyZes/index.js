import styles from '../../styles/About.module.scss';
export default function LifeWithWithoutZes() {
	return (
		<section
			className={styles.whoWeAre}
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
								The Zes Beauty Club was established so that women may have
								confidence in their skills and experience life to the fullest to
								the extent possible. A lady must be gorgeous, have
								self-assurance, and be able to manipulate her looks with her
								thoughts in order to become a member of the Zes Beauty Club.
							</p>
							<p className={styles.description}>
								Because they know that their fellow club members would always
								have their backs, the women who are members of the Zes Beauty
								Club are able to feel secure enough to express themselves and
								follow their hobbies without fear of judgment from other club
								members. This amazing club intends to put the old saying,
								&#34;Your network is your net worth&#34; into practise by
								pushing its members to establish tighter relationships with one
								another. We&#39;ve all heard the saying, and it&#39;s one that
								we can all attest to having some validity. We have more strength
								than any other group when we work together. In addition to this,
								we think of ourselves as belonging to the Zes gender.
							</p>
							<br />
							<br />
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
								Those people who are immune to the Zes Beauty Club that we are
								all about are still living, but their lives are incomplete since
								they have not yet tasted the genuine sweetness that life has to
								offer. A life without Zes Beauty Club is comparable to a flower
								without a fragrance, a bird without wings, an ocean without
								water, and a night sky without stars. If you are unable to let
								the experience of all the beauty that is all around you to fill
								your spirit with pleasure, then life will become a dry and heavy
								existence for you to endure.
							</p>
							{/* <p className={styles.description}>
								Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed
								diam nonum my nibh euismod tincidunt ut laoreet dolore magna
								aliquam erat volutpat. Ut wisi enim ad minim veniam, quis
								nostrud exerci tation ullamcorper susci pit lobortis nisl ut
								aliquip ex ea commodo consequat. Duis autem vel eum iriure dolor
								in hendrerit in vulputate velit esse molestie consequat.
							</p> */}
							<br />
							<br />
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
