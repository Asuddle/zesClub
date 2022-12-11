// import 'react-image-lightbox/style.css';

import {
	Button,
	Col,
	Modal,
	ModalBody,
	ModalFooter,
	ModalHeader,
	Row,
} from 'reactstrap';

import Image from 'next/image';
// import Lightbox from 'react-image-lightbox';
import { useState } from 'react';

export default function GalleryModal({ toggle, data }) {
	// const [gallery, setGallery] = useState({ photoIndex: 0, isOpen: false });
	const [photoIndex, setPhotoIndex] = useState(0);
	const [isOpen, setIsOpen] = useState(false);

	const dataArr = [];
	const imageGallArr = [];
	for (let index = 0; index < data.imageCount; index++) {
		dataArr.push(index + 1);
		imageGallArr.push(`/Gallery/${data.folder}/Img${index + 1}.jpg`);
	}

	return (
		<>
			{/* <Modal size='xl' isOpen={data.name} toggle={toggle}>
				<ModalHeader toggle={toggle}>{data.name}</ModalHeader>
				<ModalBody>
					<Row>
						{dataArr.map((item) => (
							<Col xs={12} sm={6} md={3} key={item}>
								<Image
									onClick={() => {
										setIsOpen(true);
										toggle();
									}}
									src={`/Gallery/${data.folder}/Img${item}.JPG`}
									width={'100%'}
									alt='heyy'
									height={'70%'}
									layout='responsive'
								/>
								<br />
							</Col>
						))}
					</Row>
				</ModalBody>
				<ModalFooter>
					<Button color='secondary' onClick={toggle}>
						Cancel
					</Button>
				</ModalFooter> */}
			{/* {data.name && (
				<Lightbox
					mainSrc={imageGallArr[photoIndex]}
					nextSrc={imageGallArr[photoIndex + 1]}
					prevSrc={imageGallArr[photoIndex + imageGallArr.length - 1]}
					onCloseRequest={() => {
						toggle();
						setPhotoIndex(0);
					}}
					onMovePrevRequest={() =>
						setPhotoIndex(photoIndex + imageGallArr.length - 1)
					}
					onMoveNextRequest={() => setPhotoIndex(photoIndex + 1)}
				/>
			)} */}
			{/* </Modal> */}
		</>
	);
}
