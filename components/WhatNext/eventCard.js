import { Col, Row } from 'reactstrap';

import BecomeMemberModal from '../Interests/modal';
import Image from 'next/image';
import styles from '../../styles/WhatNext.module.scss';
import { useState } from 'react';

export default function EventCard({ item, idx }) {
	const [open, setOpen] = useState(false);
	const handleClick = () => {
		setOpen(!open);
	};
	return (
		<Col
			key={item}
			lg={6}
			md={12}
			sm={12}
			xs={12}
			data-aos='fade-up'
			style={{ textAlign: 'center' }}
		>
			<Row className={styles.cardWrapper} style={{ margin: '36px' }}>
				<Col md={7} style={{ paddingTop: '8px' }}>
					<Image
						className='img-fluid'
						src={`/${item.image}`}
						width='100%'
						height='100%'
						layout='responsive'
						alt=''
					/>
				</Col>
				<Col md={5}>
					<div className={styles.dataWrapper}>
						<p className={styles.eventName}>{item.name}</p>
						<p className={styles.price}>AED {item.price}</p>
						<p className={styles.venue}>
							<span>{item.venue}</span>
						</p>
						<p className={styles.venue}>
							<span>{item.audience}</span>
						</p>
						<p className={styles.venue}>
							<span>{item.date}</span>
						</p>
					</div>
					<div
						style={{
							display: 'inline-flex',
							textAlign: 'left',
							float: 'left',
						}}
					>
						<button onClick={handleClick} className={styles.bookNow}>
							BOOK NOW
						</button>
						<p className={styles.moreDetail}>More Details</p>
					</div>
					<BecomeMemberModal open={open} handleClose={handleClick} />
				</Col>
			</Row>
			<br />
			<br />
			<br />
		</Col>
	);
}
