import { Col, Row } from 'reactstrap';

import ContainerComponent from '../container';
import Image from 'next/image';

export default function FoodCategory({ data, handleClick }) {
	console.log(data);
	return (
		<ContainerComponent>
			<Row>
				{data.map((item) => (
					<Col md={3} key={item}>
						<Image
							style={{ cursor: 'pointer' }}
							src={`/${item.image}`}
							alt='foody'
							width='221px'
							height='221px'
							onClick={handleClick}
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
