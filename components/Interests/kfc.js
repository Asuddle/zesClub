import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import { Col, Row } from 'reactstrap';

import BecomeMemberModal from './modal';
import ContainerComponent from '../container';
import Image from 'next/image';
import QrScanner from 'qr-scanner';
import styles from '../../styles/Interest.module.scss';
import { toast } from 'react-toastify';
import { useState } from 'react';

const burgerArr = [
	{ name: 'Double Burger', price: '$8.50' },
	{ name: 'Farm House', price: '$7.50' },
	{ name: 'Bacon Burger', price: '$8.00' },
	{ name: 'Special Offer', price: '$15.00' },
	{ name: 'Black Burger', price: '$11.00' },
	{ name: 'King Burger', price: '$11.00' },
];

export default function KFCPage({ data = burgerArr }) {
	const [open, setOpen] = useState(false);
	const [qrModal, setQrModal] = useState(false);
	const [qr, setQr] = useState('');
	const [qrSuccess, setQrSuccess] = useState(false);
	const handleChange = (item) => {
		console.log(item);
		const userData = localStorage.getItem('userData');
		if (userData) {
			setQrModal(!qrModal);
			setQr(item.qr);
		} else {
			setOpen(!open);
		}
	};
	return (
		<ContainerComponent container='mediumContainer'>
			<div className={styles.restaurantPage}>
				<Image
					src={`/${data[0].brand_image}`}
					width='300px'
					style={{ marginBottom: '40px' }}
					height='300px'
					alt='kfc'
				/>
				<br />
				<br />
				<br />
				<br />
				<Row style={{ padding: '0px 20px' }}>
					{data.map((item, idx) => (
						<Col
							md={12}
							lg={6}
							key={item}
							className={styles.imageWrapper}
							style={{ marginBottom: '20px', maxWidth: '485px' }}
						>
							<div className={styles.menuImageBackground}></div>
							<div className={styles.dataWrapper}>
								<p className={styles.burgerName}>{item.name}</p>
								<p className={styles.price}>AED {item.price}</p>
								<button
									className={styles.scanButton}
									onClick={() => handleChange(item)}
								>
									Scan Now
								</button>
							</div>{' '}
							<Image
								key={item}
								src={`/${item.image}`}
								className={styles.dealImage}
								width='557px'
								height='242px'
								alt='kfc'
							/>
						</Col>
					))}
				</Row>
				<br />
				<br />
				<br />
			</div>
			<BecomeMemberModal open={open} handleClose={handleChange} />

			<Modal
				isOpen={qrModal}
				toggle={() => setQrModal(!qrModal)}
				centered
				style={{ width: '320px' }}
			>
				<img src={qr} style={{ width: '300px', height: '300px' }} />
				<Button
					color='success'
					style={{ margin: '20px' }}
					onClick={() => {
						QrScanner.scanImage(qr)
							.then((result) => {
								toast.success('The Qr Scanned Successfully');
								setQrModal(!qrModal);
							})
							.catch((error) => console.log(error || 'No QR code found.'));
					}}
				>
					Scan
				</Button>
				<br />
			</Modal>
		</ContainerComponent>
	);
}
