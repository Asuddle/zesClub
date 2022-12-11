import { Col, Row } from 'reactstrap';

import ContainerComponent from '../container';
import Image from 'next/image';

export default function FoodCategory({ handleFoodRes }) {
	return (
		<ContainerComponent>
			<Row>
				{[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((item) => (
					<Col md={3} key={item}>
						<Image
							style={{ cursor: 'pointer' }}
							src={`/PG2/F${item}.png`}
							alt='foody'
							width='221px'
							height='221px'
							onClick={handleFoodRes}
						/>
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
