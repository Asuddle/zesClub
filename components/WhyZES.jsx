import WhyZesIcons from './whyZesIcons';
import styles from '../styles/Home.module.scss';
import { useRouter } from 'next/router';

const imageArr = [
	{
		name: 'Friendly Team',
		description: 'Our staff is both knowledgeable and welcoming.',
	},
	{
		name: 'Perfect Decoration',
		description:
			'We are able to give astounding, vibrant, and lovely embellishments.',
	},
	{
		name: 'Unique Scenario',
		description:
			'Alternative ways of doing business with the goal of expanding women’s communities',
	},
	{
		name: 'Rememberable Time',
		description:
			'We have experienced days that will be remembered for their countless memories.',
	},
	{
		name: 'Effective Support',
		description:
			'ZeS offers all services and assistance to our customers through online customer support.',
	},
	{
		name: 'Brilliant Ideas',
		description:
			'A group of women who get together to share their creative insights with one another.',
	},
];

function WhyZES() {
	const router = useRouter();
	const handleClick = () => {
		router.push('/about');
	};
	return (
		<section
			className={styles.whyZesWrapper}
			data-aos='fade-right'
			data-aos-delay='500'
		>
			<div className='container'>
				<div className='row mb-3 position-relative'>
					<div className='col-sm-12 col-md-12 col-lg-4'>
						<div className={styles.upperDivider}></div>
						<div className={styles.dataWrapper}>
							<p className={styles.heading}>Why ZES</p>
							<p className={styles.subHeading}>
								ZeS <span>Events Management</span>
							</p>
							<br />
							<p className={styles.description}>
								ZeS has been started with the intention of establishing a
								community service organization that would make people's everyday
								lives easier. We at ZeS want to improve not only your day-to-day
								life but also your professional and personal lives, as well as
								your health, fitness, and physical attractiveness.
							</p>
							<br />

							<button onClick={handleClick} className={styles.aboutZesButton}>
								ABOUT ZeS
							</button>
							<br />
						</div>
					</div>
					<div className='col-sm-12 col-md-12 col-lg-8'>
						<div className='category category-grid-style-01'>
							{imageArr.map((item, idx) => (
								<WhyZesIcons key={item.name} item={item} index={idx} />
							))}
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}

export default WhyZES;
