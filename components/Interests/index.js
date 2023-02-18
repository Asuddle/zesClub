import { Col, Row } from 'reactstrap';
import { useEffect, useState } from 'react';

import ContainerComponent from '../container';
import Image from 'next/image';
import axios from 'axios';
import styles from '../../styles/Interest.module.scss';

const interestArr = [
	{
		value: 'Business and Industry',
		label: 'Business and Industry',
	},
	{
		value: 'Entertainment and leisure',
		label: 'Entertainment and leisure',
	},
	{
		value: 'Family and Relationships',
		label: 'Family and Relationships',
	},
	{
		value: 'Fitness and Wellness',
		label: 'Fitness and Wellness',
	},
	{
		value: 'Food and Drink',
		label: 'Food and Drink',
	},
	{
		value: 'Hobbies and Activities',
		label: 'Hobbies and Activities',
	},
	{
		value: 'Shopping and Fashion',
		label: 'Shopping and Fashion',
	},
	{
		value: 'Sports and Outdoors',
		label: 'Sports and Outdoors',
	},
	{
		value: 'Technology and Gadgets',
		label: 'Technology and Gadgets',
	},
	{
		value: 'Beauty and Body Care',
		label: 'Beauty and Body Care',
	},
	{
		value: 'Miscellaneous',
		label: 'Miscellaneous',
	},
];

export default function InterestsCategories({ handleFood }) {
	const [interests, setInterests] = useState([]);
	useEffect(() => {
		axios
			.get('api/promotions')
			.then((res) => {
				console.log(res.data.data);
				setInterests(res.data.data);
			})
			.catch((err) => {
				console.log(err);
			});
	}, []);

	return (
		<ContainerComponent>
			<div className={styles.interestCategoriesWrapper}>
				<Row>
					{interests.map((item, idx) => (
						<Col key={item.label} md={4} className='text-center mb-5'>
							<div className={styles.overlay} onClick={() => handleFood(item)}>
								<p>{item.name}</p>
								<Image
									// interests/img${idx + 1}.png
									src={`/${item.image}`}
									width='221px'
									height='221px'
									alt={item.name}
								/>
								<div></div>
							</div>
						</Col>
					))}
				</Row>
				{/* <Col md={4} className='text-center'>
						<div className={styles.overlay} onClick={handleFood}>
							<p>Sports</p>
							<Image
								src='/PG1/Sports.png'
								width='221px'
								height='221px'
								alt='accessories'
							/>
							<div></div>
						</div>
					</Col>
					<Col md={4} className='text-center'>
						<div className={styles.overlay} onClick={handleFood}>
							<p>Accessories</p>
							<Image
								src='/PG1/Accessories.png'
								width='221px'
								height='221px'
								alt='accessories'
							/>
							<div></div>
						</div>
					</Col>
				</Row>
				<br />
				<br />
				<br />
				<Row>
					<Col md={2}></Col>
					<Col md={4} className='text-center'>
						<div className={styles.overlay} onClick={handleFood}>
							<p>Makeup</p>
							<Image
								src='/PG1/Makeup.png'
								width='221px'
								height='221px'
								alt='accessories'
							/>
							<div></div>
						</div>
					</Col>
					<Col md={4} className='text-center' onClick={handleFood}>
						<div className={styles.overlay}>
							<p>Fashion</p>
							<Image
								src='/PG1/Fashion.png'
								width='221px'
								height='221px'
								alt='accessories'
							/>
							<div></div>
						</div>
					</Col>
					<Col md={2}></Col>
				</Row> */}
				<br />
				<br />
				<br />
			</div>
		</ContainerComponent>
	);
}
