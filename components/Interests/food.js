import { Col, Row } from 'reactstrap';

import ContainerComponent from '../container';
import Image from 'next/image';
import styles from '../../styles/Interest.module.scss';

export default function FoodCategory({ data = [], handleClick }) {
	console.log(data);
	return (
		<ContainerComponent>
			<Row style={{ padding: '0px 20px' }}>
				{data.map((item) => (
					<Col sm={12} md={3} lg={4} key={item}>
						{/* <Image
							style={{ cursor: 'pointer' }}
							src={`/${item.image}`}
							alt='foody'
							width='221px'
							className={styles.brandsImage}
							height='221px'
							onClick={() => handleClick(item)}
						/> */}
						<img
							src={`/${item.image}`}
							className={styles.brandsImage}
							height='221px'
							alt='foody'
							width='221px'
							style={{ cursor: 'pointer' }}
							onClick={() => handleClick(item)}
						/>
						<h4 style={{ width: '221px' }} className='text-center'>
							{item.name}
						</h4>
					</Col>
				))}
			</Row>
			<br />
			<br />
			<br />
			<br />
		</ContainerComponent>
	);
}
