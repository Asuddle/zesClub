import 'aos/dist/aos.css';

import {
	Button,
	Col,
	Modal,
	ModalBody,
	ModalFooter,
	ModalHeader,
	Row,
} from 'reactstrap';
import React, { useEffect, useState } from 'react';
import {
	faCalendar,
	faLocation,
	faLocationDot,
} from '@fortawesome/free-solid-svg-icons';

import AOS from 'aos';
import ContainerComponent from '../container';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import GalleryModal from './modal';
import Header from '../Header';
import HeadingComponent from '../Heading';
import Image from 'next/image';
import ReactImageGallery from 'react-image-gallery';
import TabsComponent from '../tabs';
import axios from 'axios';
import styles from '../../styles/gallery.module.scss';

export default function GalleryMainComponent() {
	const [data, setData] = useState([]);
	const [galleryData, setGalleryData] = useState([]);

	useEffect(() => {
		axios
			.get('/api/events')
			.then((res) => {
				console.log(res.data);
				setData(res.data.data);
			})
			.catch((err) => {
				console.log(err);
			});
		AOS.init();
	}, []);

	const toggle = () => {
		setData({});
	};
	const getData = (item) => {
		// setData(item);
		axios
			.get(`/api/gallery?id=${item.id}`)
			.then((res) => {
				console.log(res.data.data);
				let arr = res.data.data.map((item) => ({
					...item,
					...{ original: `/${item.image}`, thumbnail: `/${item.image}` },
				}));
				setGalleryData(arr);
			})
			.catch((err) => {
				console.log(err);
			});
	};

	return (
		<div className={styles.galleryWrapper}>
			<ContainerComponent>
				<HeadingComponent
					heading='Gallery'
					subBoldHeading='Unforgetable Times'
					subHeading='Beautiful &'
				/>
				<>
					{galleryData.length == 0 ? (
						<>
							<TabsComponent />
							<br />
							<br />
							<Row className='text-center'>
								{data.map((item, idx) => (
									<Col
										key={item.name}
										lg={4}
										md={6}
										sm={12}
										xs={12}
										data-aos='fade-up'
									>
										<div
											className={styles.cardWrapper}
											onClick={() => getData(item)}
										>
											<Image
												className='img-fluid'
												src={`/${item.image}`}
												alt=''
												layout='responsive'
												width='100%'
												height='100%'
												// objectFit='contain'
											/>
											<div className={styles.dataWrapper}>
												<p className={styles.eventName}>{item.name}</p>
												<p className={styles.eventCaption}>
													{item.description}
												</p>
												<div className={styles.eventInfo}>
													<p className={styles.venue}>
														<FontAwesomeIcon icon={faLocationDot} />{' '}
														<span>{item.venue}</span>
													</p>
													<p className={styles.calendar}>
														<FontAwesomeIcon icon={faCalendar} />
														<span>{item.date}</span>
													</p>
												</div>
											</div>
										</div>
										<br />
									</Col>
								))}
							</Row>
						</>
					) : (
						<Row className='text-center'>
							<Col md={4}>
								<Button
									onClick={() => {
										setGalleryData([]);
									}}
									style={{ margin: '24px 0px' }}
								>
									Back
								</Button>
							</Col>
							<div
								style={{
									width: '1000px',
									marginLeft: 'auto',
									marginRight: 'auto',
								}}
							>
								{galleryData.length > 0 && (
									<ReactImageGallery lazyLoad items={galleryData} />
								)}
							</div>
						</Row>
					)}
				</>
			</ContainerComponent>
		</div>
	);
}
