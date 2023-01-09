import 'bootstrap/dist/css/bootstrap.min.css';

import { Col, Row } from 'reactstrap';

import BaseCard from '../../../components/baseCard/BaseCard';
import { Button } from '@mui/material';
import { useState } from 'react';

export default function AddGallery() {
	const [imgsSrc, setImgsSrc] = useState([]);

	const onChange = (e) => {
		for (const file of e.target.files) {
			const reader = new FileReader();
			reader.readAsDataURL(file);
			reader.onload = () => {
				setImgsSrc((imgs) => [...imgs, reader.result]);
			};
			reader.onerror = () => {
				console.log(reader.error);
			};
		}
	};
	return (
		<div>
			<BaseCard title='Gallery'>
				<div>
					<Button
						style={{ float: 'right' }}
						color='success'
						variant='contained'
					>
						Save
					</Button>
					<br />
					<div>
						<input onChange={onChange} type='file' name='file' multiple />
						<Row>
							{imgsSrc.map((link) => (
								<Col key={link} xl={4} md={4} style={{ padding: '16px' }}>
									<img style={{ maxWidth: '100%' }} src={link} height='fluid' />
								</Col>
							))}
						</Row>
					</div>
				</div>
			</BaseCard>
		</div>
	);
}
