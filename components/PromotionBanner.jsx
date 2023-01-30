import styles from '../styles/Home.module.scss';
import { useRouter } from 'next/router';

export default function PromotionBanner() {
	const router = useRouter();
	const handleClick = () => {
		router.push('/register');
	};
	return (
		<div className={styles.readyBannerWrapper}>
			<div
				className='container-fluid facts my-5 py-5 bg-gradient'
				// style='text-align: center;color: white !important;'
			>
				<p className={styles.heading}>
					Are you ready to make <strong>your own Special Events?</strong>{' '}
				</p>
				<br />
				<p className={styles.captionPara}>
					We have specialized team to turn your event a memorable one for all.
					We can help you from ideas to execution.
				</p>
				<br />
				<a href='#contact-form' className='book-now-btn'>
					BOOK NOW!
				</a>

				{/* <a className='book-now-btn'   href='#contact-form'  */}
				{/* // onClick={handleClick} */}
				{/* > */}
				{/* BOOK NOW! */}
				{/* <a /> */}
			</div>
		</div>
	);
}
