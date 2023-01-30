import Image from 'next/image';
import styles from '../styles/Home.module.scss';
export const ProjectImageComponent = ({ title, largeImage, smallImage }) => {
	console.log(`/${smallImage}`);
	return (
		<div className={styles.projectItem}>
			<div className={styles.hoverBg}>
				{' '}
				<a href={largeImage} title={title} data-lightbox-gallery='gallery1'>
					<div className={styles.hoverText}>
						<h4>{title}</h4>
					</div>
					<Image
						src={smallImage}
						width='100%'
						height='100%'
						layout='responsive'
						objectFit='cover'
						alt='pro'
						className='img-responsive'
					/>{' '}
				</a>{' '}
			</div>
		</div>
	);
};
