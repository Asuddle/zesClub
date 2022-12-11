import styles from '../styles/Home.module.scss';
import { useState } from 'react';

export default function TabsComponent() {
	const [selected, setSelected] = useState(0);
	const buttonArray = ['All Media', 'Videos', 'Photos'];
	return (
		<div className={styles.container} style={{ textAlign: 'center' }}>
			<div className={styles.tabsWrapper}>
				{buttonArray.map((item, idx) => (
					<button
						className={idx == selected ? styles.selectedButton : ''}
						key={item}
						onClick={() => setSelected(idx)}
					>
						{item}
					</button>
				))}
				{/* <button>All Media</button>
				<button>Videos</button>
				<button>Photos</button> */}
			</div>
		</div>
	);
}
