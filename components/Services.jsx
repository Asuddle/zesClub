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
			name: 'Service',
			src: '/home/Service1.jpg',
		},
		{
			name: 'Service',
			src: '/home/Service2.jpg',
		},
		{
			name: 'Service',
			src: '/home/Service3.jpg',
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
									width='292'
									height='383'
									// objectFit='contain'
								/>
								<button href='#' className={styles.serviceButton}>
									Service 1<p>lorem picsum it is das</p>
								</button>
							</div>
						</div>
					))}
				</Slider>
			</div>
		</div>
	);
}
