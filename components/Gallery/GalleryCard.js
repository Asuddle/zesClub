import { faCalendar, faLocationDot } from '@fortawesome/free-solid-svg-icons';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Image from 'next/image';
import homeStyles from '../../styles/Home.module.scss';
import styles from '../../styles/gallery.module.scss';

export default function GalleryCard({ idx, item }) {
	return (
		<div className={styles.cardWrapper}>
			<Image
				className='img-fluid'
				src={`/${item.image}`}
				alt=''
				layout='responsive'
				width='100%'
				height='100%'
				// objectFit='contain'
			/>
			<div className={styles.dataWrapper}>
				<p className={styles.eventDate}>
					<span>0{idx + idx * 2 + 1}</span>
					<br />
					Dec
				</p>
				<p className={styles.eventName}>{item.name}</p>
				{/* <p className={styles.eventDate}>{item.name}</p> */}
				<p className={styles.eventCaption}>{item.description}</p>
				<div className={styles.eventInfo}>
					<p className={styles.venue}>
						<FontAwesomeIcon icon={faLocationDot} /> <span>{item.venue}</span>
					</p>
					<p className={styles.calendar}>
						<FontAwesomeIcon icon={faCalendar} />
						<span>{item.date}</span>
					</p>
				</div>
			</div>
		</div>
	);
}
