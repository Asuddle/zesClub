import 'bootstrap/dist/css/bootstrap.min.css';

import { Button, Chip } from '@mui/material';
import { Col, Row } from 'reactstrap';

import BaseCard from '../../../../components/baseCard/BaseCard';
import axios from 'axios';
import { deleteCall } from '../../../../util/axios';
import styles from '../../../../styles/gallery.module.scss';
import { useEffect } from 'react';
import { useRouter } from 'next/dist/client/router';
import { useState } from 'react';

export default function AddGallery() {
	const [imgsSrc, setImgsSrc] = useState([]);
	const [view, setView] = useState(4);
	const [refresh, setRefresh] = useState(false);
	const router = useRouter();
	console.log(router.isReady, router.query);
	useEffect(() => {
		if (router.isReady) {
			console.log(router);
			axios
				.get(`/api/gallery?id=${router.query.id}`)
				.then((res) => {
					console.log(res.data.data);
					setImgsSrc(res.data.data);
				})
				.catch((err) => {
					console.log(err);
				});
		}
	}, [refresh, router.isReady]);

	const onChange = (e) => {
		const formData = new FormData();
		let files = e.target.files[0];
		formData.append('event_id', parseInt(router.query.id));
		formData.append('image', files);
		// console.log(files, router.query);
		const config = {
			headers: { 'content-type': 'multipart/form-data' },
		};
		axios
			.post('/api/gallery', formData, config)
			.then((response) => {
				// console.log(response.data);
				setRefresh(!refresh);
			})
			.catch((err) => {
				console.log(err);
			});
	};

	const handleDelete = (id) => {
		deleteCall(`/api/gallery?id=${id}`)
			.then((res) => {
				setRefresh(!refresh);
			})
			.catch((err) => {
				console.log(err);
			});
	};

	return (
		<div>
			<BaseCard title='Gallery'>
				<div>
					<div className='text-right' style={{ float: 'right' }}>
						<Chip
							label='Normal Size'
							onClick={() => setView(4)}
							variant='outlined'
							color='primary'
							size='large'
						/>
						{'  '}
						<Chip
							label='Big Size'
							onClick={() => setView(6)}
							variant='outlined'
							color='primary'
							size='large'
						/>
						{'  '}

						<Chip
							label='Biggest Size'
							onClick={() => setView(12)}
							variant='outlined'
							color='primary'
							size='large'
						/>
					</div>
					<br />
					<div>
						<input onChange={onChange} type='file' name='file' multiple />
						<Row>
							{imgsSrc.map((link) => (
								<Col
									key={link.id}
									xl={view}
									md={view}
									className={styles.imageContainer}
									style={{ padding: '16px' }}
								>
									<img
										style={{ maxWidth: '100%' }}
										src={`/${link.image}`}
										height='fluid'
									/>
									<Button
										variant='contained'
										color='danger'
										size='small'
										onClick={() => handleDelete(link.id)}
									>
										Delete
									</Button>
								</Col>
							))}
						</Row>
					</div>
				</div>
			</BaseCard>
		</div>
	);
}
