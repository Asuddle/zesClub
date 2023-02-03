import { faCalendar, faLocationDot } from '@fortawesome/free-solid-svg-icons';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Image from 'next/image';
import styles from '../../styles/gallery.module.scss';

let smallCalendar = [
	'JAN',
	'FEB',
	'MAR',
	'APR',
	'MAY',
	'JUN',
	'JUL',
	'AUG',
	'SEP',
	'OCT',
	'NOV',
	'DEC',
];

export default function GalleryCard({ idx, item }) {
	// console.log('item', item.date);
	let eventDate = new Date(item.date).getDate();
	let eventMonth = new Date(item.date).getMonth();
	// console.log(item.date, eventMonth, smallCalendar.length);
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
					<span>{eventDate.toString().padStart(2, '0')}</span>
					<br />
					{smallCalendar[eventMonth]}
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
