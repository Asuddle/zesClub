import { Col, Container, Row } from 'reactstrap';
import { useEffect, useState } from 'react';

import HeadingComponent from './Heading';
import Image from 'next/image';
import { ProjectImageComponent } from './Image';
import TabsComponent from './tabs';
import axios from 'axios';
import styles from '../styles/Home.module.scss';
import { useRouter } from 'next/router';

export default function ProjectsComponent({ hideMenu = false }) {
	const router = useRouter();
	const [data, setData] = useState([]);
	const handleGallery = () => {
		router.push('/gallery');
	};
	useEffect(() => {
		axios
			.get('/api/events')
			.then((res) => {
				console.log(res.data.data);
				const slicedArray = res.data.data.slice(0, 5);
				setData(slicedArray);
			})
			.catch((err) => {
				console.log(err);
			});
	}, []);

	return (
		<div className={styles.projectWrapper} data-aos='flip-left'>
			{!hideMenu && (
				<>
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
				</>
			)}
			<Row noGutters>
				{data.length > 0 &&
					data.map((item) => (
						<Col sm={12} md={6} lg={4} key={item.image}>
							<ProjectImageComponent
								key={item.image}
								title={item.name}
								largeImage={item.image}
								smallImage={`/${item.image}`}
							/>
						</Col>
					))}
			</Row>
			<button className={styles.viewAllGalleryBtn} onClick={handleGallery}>
				View All Gallery
			</button>
		</div>
	);
}
