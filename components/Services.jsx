import HeadingComponent from './Heading';
import Image from 'next/image';
import Slider from 'react-slick';
import styles from '../styles/Home.module.scss';

export default function ServiceComponent() {
	const settings = {
		dots: true,
		infinite: true,
		speed: 500,
		slidesToShow: 3,
		slidesToScroll: 3,
		arrows: false,
		autoplay: true,
		responsive: [
			{
				breakpoint: 1024,
				settings: {
					slidesToShow: 3,
					slidesToScroll: 3,
					infinite: true,
					dots: true,
				},
			},
			{
				breakpoint: 600,
				settings: {
					slidesToShow: 2,
					slidesToScroll: 2,
					initialSlide: 2,
				},
			},
			{
				breakpoint: 480,
				settings: {
					slidesToShow: 1,
					slidesToScroll: 1,
				},
			},
		],
	};

	const serviceArray = [
		{
			name: 'Corporate Events',
			src: '/home/Service1.jpg',
			description:
				'* Team Building Events* Conferences* Recruiting Events* Product Launches* Networking Events* Seminars* Trade Shows / Expos* Corporate Dinners* Shareholder / Corporate Board Meetings* Year-End Functions/parties* Workshops/courses* Charity events',
		},
		{
			name: 'Personal events and parties',
			src: '/home/Service2.jpg',
			description:
				'* Birthday Parties* Engagement Parties* Themed Celebrations* Hens &amp; Bucks Parties* Baby showers* Family Events* VIP Events* Community Events',
		},
		{
			name: 'Celebrity Functions and Award Ceremonies',
			src: '/home/Service3.jpg',
			description:
				'* National Music Awards* Local and National Business Awards* National Film Awards* Concerts* Choral Music concert* Band concert* Opera concert',
		},
		{
			name: 'Festivals',
			src: '/home/Service4.jpg',
			description:
				'* Music* Film* Art* Community celebrations* City Festivals* Road Shows* Theme Events* Fire Work',
		},
		{
			name: 'Wedding',
			src: '/home/Service5.jpg',
			description:
				'We help guide their clients every step of the way when it comes to designing, planning, and executing their dream wedding.',
		},
	];

	return (
		<div
			className={styles.serviceWrapper}
			data-aos='fade-right'
			data-aos-delay='500'
		>
			<div className={styles.container}>
				<HeadingComponent
					heading='Our Services'
					subHeading='Professional'
					subBoldHeading='Experties'
				/>
				<Slider {...settings}>
					{serviceArray.map((item, idx) => (
						<div key={idx}>
							<div className={styles.imageContainer}>
								<Image
									className='img-fluid'
									src={item.src}
									alt=''
									// layout='responsive'
									width='400'
									height='400'
									// objectFit='contain'
								/>
								<button href='#' className={styles.serviceButton}>
									{item.name}
									<p>{item.description}</p>
								</button>
							</div>
						</div>
					))}
				</Slider>
			</div>
		</div>
	);
}
