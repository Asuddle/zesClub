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
import TabsComponent from '../tabs';
import styles from '../../styles/gallery.module.scss';

const galleryArr = [
	{
		name: 'Launch Party',
		imageCount: 6,
		date: '14th september 2021',
		folder: '1',
	},
	{
		name: 'Past life regression therapy',
		imageCount: 25,
		date: '22nd march 2022',
		folder: '2',
	},
	{
		name: 'Second Party',
		imageCount: 25,
		date: '16th october 2021',
		folder: '3',
	},
	{
		name: 'Third Party',
		imageCount: 30,
		date: '17th january 2022',
		folder: '4',
	},
];

export default function GalleryMainComponent() {
	useEffect(() => {
		AOS.init();
	}, []);
	const [data, setData] = useState({});
	const toggle = () => {
		setData({});
	};
	const getData = (item) => {
		setData(item);
	};

	return (
		<div className={styles.galleryWrapper}>
			<ContainerComponent>
				<HeadingComponent
					heading='Gallery'
					subBoldHeading='Unforgetable Times'
					subHeading='Beautiful &'
				/>
				<TabsComponent />
				<br />
				<br />
				<Row className='text-center'>
					{galleryArr.map((item, idx) => (
						<Col
							key={item.name}
							lg={4}
							md={6}
							sm={12}
							xs={12}
							data-aos='fade-up'
						>
							<div className={styles.cardWrapper} onClick={() => getData(item)}>
								<Image
									className='img-fluid'
									src={`/home/Gallery${idx + 1}.jpg`}
									alt=''
									layout='responsive'
									width='100%'
									height='100%'
									// objectFit='contain'
								/>
								<div className={styles.dataWrapper}>
									<p className={styles.eventName}>{item.name}</p>
									<p className={styles.eventCaption}>
										lorem ipsum dsad asd asd as das das das d as das d dasd
										asdsa das das d asd ad as d
									</p>
									<div className={styles.eventInfo}>
										<p className={styles.venue}>
											<FontAwesomeIcon icon={faLocationDot} />{' '}
											<span>Venue</span>
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
					<GalleryModal toggle={toggle} data={data} />
				</Row>
			</ContainerComponent>
		</div>
	);
}
