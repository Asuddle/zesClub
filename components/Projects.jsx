import { Col, Container, Row } from 'reactstrap';

import HeadingComponent from './Heading';
import Image from 'next/image';
import { ProjectImageComponent } from './Image';
import TabsComponent from './tabs';
import styles from '../styles/Home.module.scss';

export default function ProjectsComponent() {
	const galleryImages = [
		{
			title: 'Project Title',
			largeImage: '/home/Gallery1.jpg',
			smallImage: '/home/Gallery1.jpg',
		},
		{
			title: 'Project Title',
			largeImage: '/home/Gallery2.jpg',
			smallImage: '/home/Gallery2.jpg',
		},
		{
			title: 'Project Title',
			largeImage: '/home/Gallery3.jpg',
			smallImage: '/home/Gallery3.jpg',
		},
		{
			title: 'Project Title',
			largeImage: '/home/Gallery4.jpg',
			smallImage: '/home/Gallery4.jpg',
		},
		{
			title: 'Project Title',
			largeImage: '/service-4.jpg',
			smallImage: '/service-4.jpg',
		},
		{
			title: 'Project Title',
			largeImage: '/service-5.jpg',
			smallImage: '/service-5.jpg',
		},
	];

	return (
		<div className={styles.projectWrapper} data-aos='flip-left'>
			<div className={styles.container}>
				<HeadingComponent
					heading='Gallery'
					subHeading='Beautiful &'
					subBoldHeading='Unforgetable Times'
				/>
			</div>
			<TabsComponent />
			<br />
			<br />
			<Row noGutters>
				{galleryImages.map((item) => (
					<Col sm={12} md={6} lg={4} key={item.largeImage}>
						<ProjectImageComponent
							key={item.largeImage}
							title={item.title}
							largeImage={item.largeImage}
							smallImage={item.smallImage}
						/>
					</Col>
				))}
			</Row>
			<button className={styles.viewAllGalleryBtn}>View All Gallery</button>
		</div>
	);
}
